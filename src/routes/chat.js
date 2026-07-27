const express = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  if (!userId || !targetUserId) {
    return res.status(400).json({ error: "Invalid user IDs" });
  }

  if (userId.equals(targetUserId)) {
    return res.status(400).json({
      error: "Cannot chat with yourself",
    });
  }

  try {
    const connection = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId: userId,
          toUserId: targetUserId,
          status: "accepted",
        },
        {
          fromUserId: targetUserId,
          toUserId: userId,
          status: "accepted",
        },
      ],
    });

    if (!connection) {
      return res.status(403).json({
        error: "You are not connected with this user",
      });
    }
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = chatRouter;

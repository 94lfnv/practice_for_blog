import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth";
import config from "../../config/index";
import User from "../../models/user";

const { JWT_SECRET } = config;
const authRoutes = express.Router();

authRoutes.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "모든 칸을 채워 주세요" });
  }

  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({ msg: "유저가 존재하지 않습니다." });

    bcrypt.compare(password, user.password).then((isMatch) => {
      // 왼쪽 패스워드는 현재 로그인하려는 유저의 패스워드, 오른쪽 패스워드는 유저가 갖고 있는 패스워드

      if (!isMatch)
        return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
      jwt.sign(
        { id: user.id },
        JWT_SECRET,
        { expiresIn: "2 days" },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        }
      );
    });
  });
});

authRoutes.post("/logout", (req, res) => {
  res.json("로그아웃 성공");
});

authRoutes.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("유저가 존재하지 않습니다.");
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: e.message });
  }
});

export default authRoutes;

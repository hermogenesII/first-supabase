import React from "react";

interface PostHeaderProps {
  avatar: string;
  username: string;
  createdAt: string;
  title: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  avatar,
  username,
  createdAt,
  title,
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 mb-1">
      <img
        src={avatar}
        alt="User avatar"
        className="w-8 h-8 rounded-full object-cover bg-gray-300"
      />
      <span className="text-xs text-gray-700 font-medium">{username}</span>
    </div>
    <p className="text-xs text-gray-500 mb-1">{createdAt}</p>
    <h2 className="text-xl font-semibold mb-1">{title}</h2>
  </div>
);

export default PostHeader;

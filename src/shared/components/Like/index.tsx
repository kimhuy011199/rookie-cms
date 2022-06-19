import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeOrUnlikeAnswer } from '../../../stores/answers/answerSlice';
import style from './style.module.css';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

interface LikeInterface {
  id: string;
  isLiked: boolean;
  likesCount: number;
  userId: string;
}

const Like = (props: LikeInterface) => {
  const { id, isLiked, likesCount, userId } = props;
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const { question } = useSelector((state: any) => state.questions);

  const handleLike = () => {
    if (!user) {
      return;
    }

    dispatch(likeOrUnlikeAnswer(id));
  };

  return (
    <>
      <button className={style.btn} onClick={handleLike}>
        {isLiked ? (
          <HiHeart className={style.icon} />
        ) : (
          <HiOutlineHeart className={style.icon} />
        )}
        <span className={style.text}>{likesCount}</span>
      </button>
    </>
  );
};

export default Like;

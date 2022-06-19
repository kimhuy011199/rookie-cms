import React from 'react';
import { Tag } from '../../constants/types/Tag';
import TagList from '../TagList';
import style from './style.module.css';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { useDialog } from '../Dialog/Provider';
import TagsCheckDialog from '../Dialog/dialogs/tags-check';

interface TagInputInterface {
  tags: Tag[];
  setTags: Function;
}

const TagInput = (props: TagInputInterface) => {
  const { tags, setTags } = props;
  const { appendDialog } = useDialog();

  const handleShowTagsDialog = () => {
    appendDialog(<TagsCheckDialog currentTags={tags} setTags={setTags} />);
  };

  return (
    <div className={style.input}>
      <TagList tagList={tags} />
      <button type="button" onClick={handleShowTagsDialog}>
        <HiOutlinePlusCircle className={style.icon} />
      </button>
    </div>
  );
};

export default TagInput;

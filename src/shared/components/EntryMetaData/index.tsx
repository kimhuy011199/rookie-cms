import React from 'react';
import { useTranslation } from 'react-i18next';
import FormGroup from '../FormGroup';
import Input from '../Input';

interface EntryMetaDataInterface {
  currentEntry: any;
  type: string;
}

const EntryMetaData = (props: EntryMetaDataInterface) => {
  const { currentEntry, type } = props;
  const { t } = useTranslation();
  return (
    <>
      <FormGroup label={t(`${type}.label.tag_id`)} flexRow>
        <Input type="text" defaultValue={currentEntry?._id} disabled />
      </FormGroup>
      <FormGroup label={t('common.created_at')} flexRow>
        <Input type="text" defaultValue={currentEntry?.createdAt} disabled />
      </FormGroup>
      <FormGroup label={t('common.updated_at')} flexRow>
        <Input type="text" defaultValue={currentEntry?.updatedAt} disabled />
      </FormGroup>
    </>
  );
};

export default EntryMetaData;

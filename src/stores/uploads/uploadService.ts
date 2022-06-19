import api from '../../core/api.service';
import { ENDPOINT } from '../../shared/constants/constants';

const endpoint = ENDPOINT.UPLOAD;

export interface AvatarImgInterface {
  data: string | ArrayBuffer;
}

// Upload image to cloudinary
const uploadImg = async (imgData: AvatarImgInterface) => {
  const response = await api().post(endpoint, imgData);
  return response.data;
};

const uploadService = {
  uploadImg,
};

export default uploadService;

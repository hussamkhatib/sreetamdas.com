/**
 * Used for:
 * - Loading keebs' images info from Imgur API
 */

import { captureException } from "@sentry/nextjs";

const IMGUR_BASE_URL = "https://api.imgur.com/3";
const IMGUR_API_CLIENT_ID = process.env.IMGUR_API_CLIENT_ID;

// export const axiosImgur = axios.create({
// 	baseURL: IMGUR_BASE_URL,
// 	headers: {
// 		...(IMGUR_API_CLIENT_ID !== "" && { Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}` }),
// 	},
// });

export interface ImgurImage {
	id: string;
	title: null;
	description: null;
	datetime: number;
	type: string;
	animated: boolean;
	width: number;
	height: number;
	size: number;
	views: number;
	bandwidth: number;
	vote: null;
	favorite: boolean;
	nsfw: null;
	section: null;
	account_url: null;
	account_id: null;
	is_ad: boolean;
	in_most_viral: boolean;
	has_sound: boolean;
	tags: unknown[];
	ad_type: number;
	ad_url: string;
	edited: string;
	in_gallery: boolean;
	deletehash: string;
	name: string;
	link: string;
}

interface ImgurAPIResponse<Type> {
	data: Type;
	status: number;
	success: boolean;
}

export async function getImgurAlbumImages(albumURL: string) {
	try {
		const response = await axiosImgur.get<ImgurAPIResponse<ImgurImage[]>>(
			`/album/${albumURL}/images`
		);

		return response.data.data;
	} catch (error) {
		captureException(error);
	}
}

const imgurKeebsAlbumHash = "3YgT5kD";

export async function addImgurImagesData<KeebDetailsFromNotion>(
	imagesData: Array<KeebDetailsFromNotion>
): Promise<Array<KeebDetails>> {
	/**
	 * We're counting on the fact that all the images for the keebs
	 * are stored in the same imgur album
	 */
	const albumImagesData = await getImgurAlbumImages(imgurKeebsAlbumHash);

	const enrichedImagesData = imagesData.map((imageData) => {
		const { image } = imageData;

		const imgurImage = albumImagesData?.find(({ link }) => link === image.url);
		if (typeof imgurImage !== "undefined") {
			return {
				...imageData,
				image: { ...imageData.image, height: imgurImage.height, width: imgurImage.width },
			} as KeebDetails;
		}

		return imageData;
	});
	return enrichedImagesData;
}

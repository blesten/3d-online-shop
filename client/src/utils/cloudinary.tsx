import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_LOGO_FOLDER_ID, CLOUDINARY_TEXTURE_FOLDER_ID } from './../config/key'

export const uploadImages = async(file: File, type: string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    type === 'logo' ? `${CLOUDINARY_LOGO_FOLDER_ID}` : `${CLOUDINARY_TEXTURE_FOLDER_ID}`
  )
  formData.append('cloud_name', `${CLOUDINARY_CLOUD_NAME}`)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return data.secure_url
  } catch (err: any) {
    console.log(err)
    throw new Error('Image upload failed')
  }
}
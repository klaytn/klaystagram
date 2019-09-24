export function getDataUrlFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}

export function getFilefromDataUrl(dataurl, filename, lastModified = Date.now()) {
  return new Promise((resolve) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?)/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let file
    try {
      file = new File([u8arr], filename, { type: mime }) // Edge do not support File constructor
    } catch (e) {
      file = new Blob([u8arr], { type: mime })
      file.name = filename
      file.lastModified = lastModified
    }
    resolve(file)
  })
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

export function drawImageInCanvas(img, maxWidthOrHeight) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (Number.isInteger(maxWidthOrHeight) && (img.width > maxWidthOrHeight || img.height > maxWidthOrHeight)) {
    if (img.width > img.height) {
      canvas.width = maxWidthOrHeight
      canvas.height = (img.height / img.width) * maxWidthOrHeight
    } else {
      canvas.width = (img.width / img.height) * maxWidthOrHeight
      canvas.height = maxWidthOrHeight
    }
  } else {
    canvas.width = img.width
    canvas.height = img.height
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}

export const drawImageFromBytes = (data) => {
  /**
   * data.slice(2)
   * Remove prefix `0x` from hexString
   */
  const hexString = data.slice(2)
  const arrayBufferView = new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
  const blob = new Blob([arrayBufferView], { type: 'image/jpeg' })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)
  return imageUrl
}

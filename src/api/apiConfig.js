const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f8326fccbf77b2dfd260e79a021b5e8f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
}

export default apiConfig;
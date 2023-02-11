const whiteList = [
  'http://localhost:5173'
]

export const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true) 
    }else{
      callback(new Error('Not allowed by CORS.'))
    }
  }
}
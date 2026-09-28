export function notFound(req,res){res.status(404).json({success:false,message:'Resource not found',error:{code:'NOT_FOUND'}})}
export function errorHandler(err,req,res,next){const status=err.status||500; if(status>=500) console.error(err); res.status(status).json({success:false,message:status>=500?'Something went wrong':err.message,error:{code:err.code||'INTERNAL_ERROR'}})}

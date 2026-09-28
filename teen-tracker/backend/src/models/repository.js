import {supabase} from '../config/supabase.js'; import {AppError} from '../utils/AppError.js';
const fail=e=>{throw new AppError(e.message,500,'DATABASE_ERROR')};
export const repo={
 async find(table,id,userId){const {data,error}=await supabase.from(table).select('*').eq('id',id).eq('user_id',userId).maybeSingle();if(error)fail(error);return data},
 async list(table,userId,query={}){let q=supabase.from(table).select('*',{count:'exact'}).eq('user_id',userId);if(query.order)q=q.order(query.order,{ascending:query.direction!=='desc'}); const {data,error,count}=await q;if(error)fail(error);return {items:data,total:count}},
 async create(table,userId,values){const {data,error}=await supabase.from(table).insert({...values,user_id:userId}).select().single();if(error)fail(error);return data},
 async update(table,id,userId,values){const {data,error}=await supabase.from(table).update(values).eq('id',id).eq('user_id',userId).select().maybeSingle();if(error)fail(error);return data},
 async remove(table,id,userId){const {error}=await supabase.from(table).delete().eq('id',id).eq('user_id',userId);if(error)fail(error)}
};

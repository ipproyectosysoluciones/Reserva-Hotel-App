import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const urlNotification="http://localhost:3001/notifications";

export const getNotifications=createAsyncThunk(
    "notifications/getNotifications",
    async()=>{
        try{
            const res = await axios.get(urlNotification)
            return res.data
        }catch(error){
            throw new Error (error.response.data.message)
        }
    }
);
export const postNotifications=createAsyncThunk(
    "nofications/postNotifications",
    async()=>{
       try{
        const res= await axios.post(urlNotification)
        return res.data
       }catch(error){
        throw new Error(error.response.data.message)
       }
    }
);
export const putNotifications=createAsyncThunk(
    "notifications/putNotifications",
    async(obj)=>{
        try{
            const res= await axios.put(urlNotification,obj)
            return res.data
        }catch(error){
            throw new Error(error.response.data.message)
        }
    }
);
export const deleteNotifications=createAsyncThunk(
    "notification/deleteNotifications",
    async(id)=>{
        try{
            const res=await axios.delete(urlNotification,{data:{id:id}})
            return res.data
        }catch(error){
            throw new Error(error.response.data.message)
        }
    }
);
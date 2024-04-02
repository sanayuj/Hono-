import {Model, Schema,model} from "mongoose"

export interface youtubeVideo{
    title:string,
    description:string,
    thumpnailUrl:string,
    watched:Boolean,
    youtuberName:string
}


const favYoutube=new Schema<youtubeVideo>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumpnailUrl:{
        type:String,
        default:""
    },
    watched:{
        type:Boolean,
        default:false,
        required:true
    },
    youtuberName:{
        type:String,
        required:true
    }
})

const favYoutubeModel=model("Videos",favYoutube)


export default favYoutubeModel
import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';

export const CloudinaryProvider = {
    provide:CLOUDINARY,
    useFactory:()=>{
        return v2.config({
            cloud_name: 'duks0nn9o', 
            api_key: '816361837366996', 
            api_secret: '-zmyNOxA1JiK7H653tt_sfnh-Hk'
        })
    }
}
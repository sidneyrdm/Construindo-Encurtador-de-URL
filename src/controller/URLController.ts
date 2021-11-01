import { URL, URLModel } from "DATABASE/model/URL";
import { Request, Response } from "express";
import shortID from 'shortid';
import { config } from "../config/Constants";

export class URLController {

    public async shorter(req: Request, res: Response): Promise<void> {
        //vê se a URL existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if(url){
            res.json({ url });
            return
        }
        //criar um hash para a URL
        
        const hash = shortID.generate();
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL });
        res.json({ newURL });
    }

    public async redirect(req: Request, res: Response):Promise<void> {
        //pegar o hash da URL
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })
        if(url){
            res.redirect(url.originURL);
            return
        }
        
        res.status(400).json({ error: 'URL not found' })
    }
}
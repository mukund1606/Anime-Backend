const express = require('express');
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async(req, res) => {
    const animeId = Number(req.query.id) || 5792;
    let animeSlug = req.query.slug || 'tate-no-yuusha-no-nariagari';
    const episode = Number(req.query.episode) || 1;
    animeSlug = animeSlug.replace('-dub', '');

    const videos = [];

    const promises = await Promise.allSettled([
        axios.get(`https://yugen.to/watch/${animeId}/${animeSlug}/${episode}`, {
            headers: {
                'Requested-Language': 'Subbed'
            }
        }),
        axios.get(`https://yugen.to/watch/${animeId}/${animeSlug}-dub/${episode}`)
    ]);

    promises.filter((result) => result.status == 'fulfilled').forEach((result) => {
        const $ = cheerio.load(result.value.data);
        videos.push({
            language: Object.keys(result.value.config.headers).includes('Requested-Language') && result.value.config.headers['Requested-Language'] === 'Subbed' ? 'Subbed' : 'Dubbed',
            video: $('#main-embed').attr('src')
        });
    });

    if(req.query.type == "dub") {
      const videoURL = videos[1].video
      res.json({
        videoURL
      });
    }
    else{
      const videoURL = videos[0].video
      res.json({
        videoURL
      });
    }
});

module.exports = router;
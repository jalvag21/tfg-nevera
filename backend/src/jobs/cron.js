import cron from 'node-cron';
import Fridge from '../models/Fridge.js';
import Reading from '../models/Reading.js';

// Simula sensores: cada minuto una lectura por zona
cron.schedule('* * * * *', async ()=>{
  try{
    const fridges = await Fridge.find({});
    for(const f of fridges){
      const zones = (f.zones && f.zones.length) ? f.zones : ['fridge/shelf1'];
      for(const zone of zones){
        const temp = 3.5 + (Math.random()*3 - 1.5);
        await Reading.create({ fridge: f._id, zone, kind: 'temperature', value: Number(temp.toFixed(2)), unit: '°C', source: 'sensor_sim', ts: new Date() });
      }
    }
  }catch(e){
    console.error('cron error', e.message);
  }
});

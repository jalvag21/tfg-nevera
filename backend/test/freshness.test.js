import { strict as assert } from 'assert';
import { computeFreshness } from '../src/services/freshness.service.js';

function daysFromNow(d){
  const dt = new Date(); dt.setDate(dt.getDate()+d); return dt.toISOString().slice(0,10);
}

describe('computeFreshness', ()=>{
  it('da ~100 con caducidad lejana y sin penalizaciones', ()=>{
    const food = { category:'fruta', expiryDate: daysFromNow(12) };
    const s = computeFreshness(food, [4,5,4.5]);
    assert.ok(s <= 100 && s >= 90);
  });

  it('baja a 0 con caducidad muy pasada', ()=>{
    const food = { category:'pescado', expiryDate: daysFromNow(-3) };
    const s = computeFreshness(food, [4,5]);
    assert.equal(s, 0);
  });

  it('penaliza apertura', ()=>{
    const food = { category:'lacteo', expiryDate: daysFromNow(5), openDate: daysFromNow(-3) };
    const s = computeFreshness(food, [4]);
    assert.ok(s < 100);
  });

  it('penaliza temperaturas por encima de 6°C', ()=>{
    const food = { category:'carne', expiryDate: daysFromNow(4) };
    const s = computeFreshness(food, [7,8]);
    assert.ok(s < 80);
  });
});

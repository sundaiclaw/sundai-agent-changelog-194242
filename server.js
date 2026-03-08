const express=require('express');
const path=require('path');
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.post('/api/changelog',(req,res)=>{
  const text=(req.body.text||'').trim();
  if(!text) return res.status(400).json({error:'text required'});
  const lines=text.split(/\n+/).filter(Boolean);
  res.json({
    summary:'Automated run summary generated',
    wins: lines.slice(0,2),
    failures: lines.slice(2,4),
    rootCause:'Inconsistent tool-call validation and missing post-save checks.',
    nextActions:['Add verification gates','Block risky tool patterns','Track deploy health']
  });
});
app.listen(process.env.PORT||3000,()=>console.log('http://localhost:3000'));

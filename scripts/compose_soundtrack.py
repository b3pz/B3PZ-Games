"""Original procedural instrumental sketches for the B3PZ World menu.
Reproducible synthesis; no sampled songs or external recordings.
"""
from pathlib import Path
import wave, subprocess
import numpy as np
SR=22050
OUT=Path(__file__).resolve().parents[1]/'assets/audio'
OUT.mkdir(parents=True,exist_ok=True)
rng=np.random.default_rng(99)
def compose(slug,bpm,root,progression,melody,energy):
 beat=60/bpm; total=32*beat; n=round(total*SR); x=np.zeros((n,2),np.float64)
 def note(start,steps,midi,amp,kind='bell',pan=0):
  duration=steps*beat; t=np.arange(round(duration*SR))/SR; f=440*2**((midi-69)/12)
  if kind=='pad':
   v=(np.sin(2*np.pi*f*t)+.22*np.sin(2*np.pi*f*2*t)+.12*np.sin(2*np.pi*f*.998*t))/1.34
   env=np.minimum(t/.25,1)*np.minimum((duration-t)/.6,1)
  elif kind=='bass':v=np.sin(2*np.pi*f*t)+.16*np.sin(2*np.pi*f*2*t);env=(1-np.exp(-t*100))*np.exp(-t*4)
  elif kind=='lead':v=np.sin(2*np.pi*f*t)+.22*np.sin(2*np.pi*f*2*t)+.1*np.sin(2*np.pi*f*3*t);env=(1-np.exp(-t*120))*np.exp(-t*4.5)
  else:v=np.sin(2*np.pi*f*t)+.25*np.sin(2*np.pi*f*3*t)*np.exp(-t*6);env=(1-np.exp(-t*170))*np.exp(-t*3)
  v*=amp*env; start=round(start*beat*SR); idx=(start+np.arange(len(t)))%n
  np.add.at(x[:,0],idx,v*np.sqrt((1-pan)/2));np.add.at(x[:,1],idx,v*np.sqrt((1+pan)/2))
 for bar in range(8):
  chord=progression[bar%len(progression)];base=root+chord[0]
  for interval in chord:note(bar*4,4.8,root+interval+12,.075,'pad',-.2)
  for pos in range(4):
   note(bar*4+pos,.8,base-12,.16 if energy else .1,'bass')
   if energy:
    t=np.arange(round(.14*SR))/SR;v=np.sin(2*np.pi*(50*t+7*(1-np.exp(-t*35))))*np.exp(-t*35)*.22
    ix=(round((bar*4+pos)*beat*SR)+np.arange(len(t)))%n
    for c in range(2):np.add.at(x[:,c],ix,v)
  if energy:
   for step in range(8):
    t=np.arange(round(.045*SR))/SR;noise=rng.normal(0,1,len(t));v=np.concatenate(([0],np.diff(noise)))*np.exp(-t*95)*.018
    ix=(round((bar*4+step*.5+.5)*beat*SR)+np.arange(len(t)))%n
    for c in range(2):np.add.at(x[:,c],ix,v)
  for j in range(8):
   pitch=chord[(j+bar)%len(chord)]+root+24
   note(bar*4+j*.5,1.1,pitch,.055 if energy else .035,'bell',(-1 if j%2 else 1)*.55)
  phrase=melody[bar%len(melody)]
  for pos,pitch,length in phrase:note(bar*4+pos,length,root+24+pitch,.12,'lead' if energy else 'bell',.12)
 # Circular delays make the rendered tail join the beginning.
 dry=x.copy();x+=np.roll(dry,round(beat*.75*SR),axis=0)*.22+np.roll(dry,round(beat*1.5*SR),axis=0)*.12
 x=np.tanh(x*1.25);x*=.78/max(np.max(np.abs(x)),.01)
 wav=OUT/(slug+'.wav')
 with wave.open(str(wav),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((x*32767).astype('<i2').tobytes())
 subprocess.run(['ffmpeg','-y','-loglevel','error','-i',str(wav),'-codec:a','libmp3lame','-b:a','128k',str(OUT/(slug+'.mp3'))],check=True)
 wav.unlink();print(slug,round(total,2),'seconds')
compose('world-orbit',96,48,[[0,3,7,10],[8,12,15,19],[5,8,12,15],[7,10,14,17]], [[(0,7,1),(1.5,10,.5),(2,12,1.5)],[(.5,15,1),(2,12,1),(3,10,.7)],[(0,8,1.5),(2,7,1),(3,3,.8)],[(0,7,1),(1.5,5,.5),(2.5,2,1)]],False)
compose('arcade-drift',116,45,[[0,3,7],[5,8,12],[8,12,15],[7,10,14]], [[(0,0,.5),(.75,7,.5),(1.5,10,.5),(2,12,.7),(3,7,.5)],[(0,8,1),(1.5,7,.5),(2,5,.5),(3,3,.5)],[(.5,12,.5),(1,15,.8),(2.5,12,.5),(3,10,.5)],[(0,7,1),(1.5,5,.5),(2,2,1)]],True)
compose('midnight-save',76,50,[[0,3,7,10],[8,12,15,19],[3,7,10,14],[10,14,17,21]], [[(0,7,1.8),(2.5,10,1.2)],[(.5,12,1.7),(3,7,.8)],[(0,3,1.5),(2,7,1.5)],[(.5,5,1.5),(2.5,2,1.2)]],False)

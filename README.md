# MOS-classifier

Hackish VoIP/RTC MOS classifier using Percentage Lost, Jitter and RTT

## Example
#### Optimal Values
```
prompt: Lost%/10:  0.0
prompt: Jitter/100:  0.5
prompt: RTT/100:  1.0
prompt: CodecType:  0
With 0,0.5,1,0 -- type =  MOS4
```

#### High Packet Loss (50%)
```
prompt: Lost%/10:  0.5
prompt: Jitter/100:  1.0
prompt: RTT/100:  1.0
prompt: CodecType:  0
With 0.5,1,1,0 -- type =  MOS1
```

### Credits
Based on the awesome [Machine Learning with JavaScript](https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483) tutorial

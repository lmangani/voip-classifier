<img src="https://user-images.githubusercontent.com/1423657/32525847-b63539c0-c426-11e7-93d2-3aba164d12a6.png" width=150>

# MOS-classifier

Hackish VoIP/RTC MOS estimation using a kNN classifier


## Notions
**MOS** stands for Mean Opinion Score, a commonly used measure for audio and video VoIP quality evaluation. This example only accounts for network performance related parameters negatively affecting the score.

**kNN** stands for *k-Nearest-Neighbours*, which is a Supervised machine learning algorithm used for classification, determining the class of a data point based on the maximum number of neighbors the data point has belonging to the same class.

#### Dataset Warning
In this example, a fictional Data set is provided for trainig ml.js KNN module using various combinations of Packet Loss, Jitter and Round-Trip-Tip measurements and their resulting MOS rank in class 1-4. This dataset is oversimplified, purely illustrative for educational purposes and does _not_ necessarily represent actual conditions.


## Examples
#### Optimal Values
```
prompt: Lost%/10:  0.0 (0%0
prompt: Jitter/100:  0.5 (50ms)
prompt: RTT/100:  1.0 (100ms)
prompt: CodecType:  0 (PCMU)
With 0,0.5,1,0 -- type =  MOS4
```

#### High Packet Loss (50%)
```
prompt: Lost%/10:  0.5 (50%)
prompt: Jitter/100:  1.0 (100ms)
prompt: RTT/100:  1.0 (100ms)
prompt: CodecType:  0 (PCMU)
With 0.5,1,1,0 -- type =  MOS1
```
-----------------

### Credits
This mere adaption is heavily based on the awesome [Machine Learning with JavaScript](https://hackernoon.com/machine-learning-with-javascript-part-2-da994c17d483) tutorial by [Abhishek Soni](https://github.com/abhisheksoni27)

## pathfinding algorithm

- 解决方案
    - A *
        - 启发式(heuristic)
    - ...

### A*

> f(n) = g(n) + h(n)
>
> 当前节点的总开销 __f__ = 当前节点到起始节点的开销(机械的) __g__ + 当前节点到终止节点的最小开销(启发式的) __h__
>
> 用欧几里得距离(Euclidean distance)作为启发式思路 `d = sqrt((x1 - x2)^ + (y1 - y2)^)`
>
> > openSet
> > > 存储了仍然需要被评估的节点, 集合为空时结束算法, 初始为一个起始节点(start).
> >
> > closedSet
> > > 存储了所有被评估过的节点列表, 不需要重新访问, 初始为空.

#### pseudo code

```
when openSet is !empty, continue
  loop openSet -> 
  when openSet[idx].cost < openSet[lowestIdx].cost, lowestIdx = idx 

  when openSet[lowestIdx] = goal, done
  
  openSet remove openSet[lowestIdx]
  closedSet add openSet[lowestIdx]
  
  loop openSet[idx].neighbors ->
    when item not in openSet, add item into openSet
    when item in openSet
      when openSet[idx].g > previous.g, save previous
```

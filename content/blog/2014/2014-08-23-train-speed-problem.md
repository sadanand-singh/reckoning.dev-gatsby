---
title: 'Puzzle 1: Train Speed Problem'
slug: 'train-speed-problem'
date: 2014-08-23
published: true
toc: false
tags:
  - Algorithms
---

As promised in the intro post, here is the first puzzle!

## Problem Statement

A man needs to go through a train tunnel to reach the other side. He starts running through the
tunnel in an effort to reach his destination as soon as possible.

<!-- more -->

When he is 1/4th of the way
through the tunnel, he hears the train whistle behind him. Assuming the tunnel is not big enough
for him and the train, he has to get out of the tunnel in order to survive. We know that the
following conditions are true.

- If he runs back, he will make it out of the tunnel by a whisker.
- If he continues running forward, he will still make it out through the other end by a whisker.

What is the speed of the train compared to that of the man?

Please give your solutions in the comments below.

## Solution

If the man decided to go back, he would have met the train at the entrance of tunnel (i.e The man
would have traveled 0.25 of the tunnel). Instead, if man went forward- by the time train would have
reached at the entrance of tunnel, the man would have been at the 0.25+0.25 = 0.5 of tunnel. Hence,
according to the second condition, the time taken by man to travel half of tunnel is same as the
time taken by the train to travel all of the tunnel. Therefore, the train is traveling at twice the
speed of the man.

**Disclaimer:** This puzzle has been copied from a [Blog](https://www.mytechinterviews.com/) on
Technical Interviews.

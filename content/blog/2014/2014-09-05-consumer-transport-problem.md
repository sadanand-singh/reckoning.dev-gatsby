---
title: 'Puzzle 2: Consumer Transport Problem'
slug: 'consumer-transport-problem'
date: 2014-09-05
published: true
toc: false
tags:
  - Algorithms
---

Here is another puzzle starring a monkey, transportation and money! Short summary - avoid dealing
with fools!

## Problem Statement

The owner of an apple plantation has a monkey. He wants to transport his 10000 apples to the
market, which is located after the forest.

<!-- more -->

The distance between his apple plantation and the market
is about 1000 kilometer. So he decided to take his monkey to carry the apples. The monkey can carry
at the maximum of 2000 apples at a time, and it eats one apple and throws another one for every
kilometer it travels.

What is the largest number of apples that can be delivered to the market?

Please give your solutions in the comments below.

## Solution

If the owner lets the monkey carry apples all the way to the end of the forest, in the first trip
itself, all of 2000 apples will be lost and the monkey will never return back, as the monkey will
be out of any food and play.

Lets approach this in a different way.

Lets break the monkey's journey by per unit distance. To carry 10000 apples for 1 km, monkey has to
make 2 x 5 - 1 = 9 trips! On each trip, the owner will loose 2 apples. Hence, for each km distance
traveled until number of apples is greater than 8000, monkey requires 9 x 2 = 18 apples.

So, distance traveled by monkey until number of apples is less than 8000 is int(2000 / 18) + 1 =
112 km, and by this time, 10,000 - 112 x 18 = 7984 apples are left. Similarly, until 6000 apples
are left, the monkey will require 2 x 4 -1 = 7 trips for every km. Hence, the total distance
traveled until no. of apples left is less than 6000 is 112 + int(2000 / 14) + 1 = 255 km, and by
this time no. of apples left is 7984 - 143 x 14 = 5982.

Now proceeding in a similar manner, until 4000 apples are left, the monkey will require 5 trips for
each km. Total distance traveled until no. of apples left is less than 4000 is 255 + int(2000/10) =
455 km. By this time, number of apples left is 5982 - 200 x 10 = 3982.

Until 2000 apples are left, the monkey will require 3 trips per km traveled. Total distance
traveled till this time is 455 + int(2000/6) + 1 = 789 km. By this time, no. of apples left is
3982 - 334 x 6 = 1978.

Below 2000 apples, the monkey will require only one trip to reach to market. Distance left is
1000 - 789 = 211 km. Number of apples required by the monkey to travel this distance is 211 x 2
= 422.

Hence, total number of apples that can reach the market is just 1978 - 422 = 1556! That's just
15.56% of all apples.

That's quite bad monkey 🙈. Moral of the story is, avoid dealing with fools 😜!

Thank you all who tried this.

**Disclaimer:** This puzzle has been inspired by a problem at the
[Blog](https://www.mytechinterviews.com/) on Technical Interviews.

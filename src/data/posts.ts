// src/data/posts.ts
// src/data/posts.ts
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
}

const assetsPath = path.join(__dirname, "../assets");

export const posts: Post[] = [
  {
    id: 1,
    title: "Finding Peace in the Simple Moments",
    excerpt: "Discover how embracing minimalism and mindfulness can transform your daily life into a more meaningful journey.",
    content: `
In our fast-paced world, finding peace can seem like an impossible task. We're constantly bombarded with notifications, deadlines, and endless to-do lists. But what if I told you that peace isn't something you find—it's something you create?

## The Art of Slowing Down

The first step to finding peace is learning to slow down. This doesn't mean abandoning your responsibilities or becoming unproductive. Instead, it's about being intentional with your time and energy.

Start by identifying the moments in your day that feel rushed or chaotic. Maybe it's your morning routine, or perhaps it's the transition from work to home. These are the perfect opportunities to introduce small pockets of calm.

## Mindfulness in Motion

Mindfulness doesn't require sitting in lotus position for hours. It can be woven into the fabric of your daily life:

- **Morning coffee ritual**: Instead of gulping down your coffee while checking emails, take five minutes to truly savor it. Notice the warmth of the cup, the aroma, the taste.

- **Walking meditation**: Your commute or daily walk can become a moving meditation. Pay attention to your footsteps, the rhythm of your breathing, the world around you.

- **Mindful transitions**: Before starting a new task, take three deep breaths. This simple practice creates a buffer between activities and helps you arrive fully present.

## Creating Sacred Spaces

Your environment profoundly affects your inner state. Consider creating small sacred spaces in your home—a cozy reading nook, a meditation corner, or simply a clutter-free area where you can retreat.

The key isn't perfection; it's intention. A single candle on a clear surface can be enough to signal to your brain that this is a space for peace.

## The Power of Presence

Perhaps the greatest gift we can give ourselves is presence. When we're fully here, in this moment, we realize that most of our stress comes from dwelling on the past or worrying about the future.

The simple moments—sunlight streaming through a window, a child's laughter, the satisfaction of a completed task—become profound when we're truly present to experience them.

## Moving Forward

Finding peace isn't a destination; it's a practice. Some days will be easier than others, and that's perfectly okay. What matters is the intention to return, again and again, to the present moment.

Start small. Choose one practice from this article and commit to it for a week. Notice how these small changes ripple outward, transforming not just moments, but your entire approach to life.

Peace is not the absence of chaos—it's the ability to find calm within it.
`,
    category: "Lifestyle",
    date: "Dec 10, 2024",
    readTime: "5 min read",
    image: path.join(assetsPath, "hero-blog.jpg"),
    slug: "finding-peace",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 2,
    title: "The Art of Productive Mornings",
    excerpt: "A comprehensive guide to creating morning routines that set you up for success and inner calm.",
    content: `
How you start your morning sets the tone for your entire day. A chaotic, rushed morning often leads to a scattered, stressful day. But a mindful, intentional morning? That's the foundation for clarity, focus, and inner peace.

## Why Mornings Matter

Research consistently shows that our willpower and decision-making abilities are strongest in the morning. By front-loading important activities and self-care rituals, we're working with our biology, not against it.

## The Night Before

A productive morning actually starts the night before. Here's how to set yourself up for success:

- **Prepare your space**: Lay out clothes, pack bags, and clear surfaces before bed.
- **Set intentions**: Take a moment to visualize how you want tomorrow to unfold.
- **Digital sunset**: Put devices away at least an hour before sleep.

## The First Hour

The first hour after waking is precious. Protect it fiercely:

**1. Resist the urge to check your phone** - Your morning should belong to you, not your inbox.

**2. Hydrate** - Your body is dehydrated after sleep. Start with a full glass of water.

**3. Move your body** - Even five minutes of stretching wakes up your nervous system.

**4. Nourish your mind** - Whether through meditation, journaling, or reading, give your mind positive input before the world demands your attention.

## Creating Your Ritual

The perfect morning routine is deeply personal. Here are questions to guide you:

- What activities energize me?
- What do I wish I had more time for?
- How do I want to feel by the time I start work?

Experiment with different combinations until you find what works. And remember—flexibility is key. The goal isn't perfection; it's intention.

## Common Pitfalls

**Trying to do too much**: Start with just one or two morning practices. Build gradually.

**Hitting snooze**: Those extra minutes of fragmented sleep actually make you more tired. Place your alarm across the room if needed.

**Skipping weekends**: Consistency builds habits. Keep a modified version of your routine on days off.

## The Ripple Effect

When you invest in your mornings, you're investing in your entire life. The calm and clarity you cultivate in those early hours doesn't disappear when you step out the door—it becomes the lens through which you experience everything.

Start tomorrow. Wake up fifteen minutes earlier. Use that time for something that matters to you. That's it. That's the beginning of transformation.
`,
    category: "Productivity",
    date: "Dec 8, 2024",
    readTime: "7 min read",
    image: path.join(assetsPath, "post-1.jpg"),
    slug: "productive-mornings",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 3,
    title: "Coastal Wanderings: A Photo Essay",
    excerpt: "Join me on a visual journey through serene coastlines and the lessons they teach us about life.",
    content: `
There's something about the coast that strips away pretense. Standing at the edge of the land, watching waves arrive from distant horizons, we're reminded of both our smallness and our connection to something vast.

## The Call of the Sea

I've always been drawn to coastlines. Not the crowded beaches of summer vacation, but the quiet shores of early morning and off-season—where the only soundtrack is wind, waves, and the occasional cry of gulls.

## Lessons from the Tide

The ocean is perhaps nature's greatest teacher of impermanence. Every wave that reaches the shore is unique—never before seen, never to be repeated. And yet they keep coming, an endless meditation on the beauty of the present moment.

**Lesson 1: Let go of what the tide takes**

The sea doesn't cling to the sand it washes over. It touches, then releases, then returns. There's profound wisdom in this rhythm of engagement and release.

**Lesson 2: Trust the rhythm**

Low tide always returns to high. Storms pass. Calm follows chaos. The coast teaches us to trust in cycles larger than ourselves.

**Lesson 3: Find your edge**

The shoreline is neither land nor sea—it's the liminal space between. Sometimes the most interesting place to be is on the edge, where two worlds meet.

## Morning Light

My favorite time on the coast is just after dawn. The light is soft, the colors are muted, and there's a quality of stillness that makes everything feel possible.

I've learned to wake before sunrise when I'm near the water. Not out of discipline, but out of love for those quiet hours when the world feels newly made.

## The Practice of Wandering

I don't hike the coast with destinations in mind. I wander—following whatever catches my eye, stopping when something asks to be observed more closely.

A tide pool. A weathered piece of driftwood. The way light filters through sea fog. These small encounters become the texture of the experience.

## Bringing the Coast Home

You don't need to live by the sea to carry its lessons with you:

- Practice the rhythm of engagement and release in your daily life
- Trust in the larger cycles, even when you can't see where they're going
- Make time for wandering without purpose
- Seek out the edges—the liminal spaces where growth happens
The coast will always be there, waiting. But its wisdom is portable—carried in the sound of waves, the smell of salt air, and the memory of standing at the edge of the world, fully alive.
`,
    category: "Travel",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    image: path.join(assetsPath, "post-2.jpg"),
    slug: "coastal-wanderings",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 4,
    title: "The Art of Slow Living",
    excerpt: "Learn how to embrace a slower pace of life and find more meaning in your daily routines through intentional choices.",
    content: `
In a world that celebrates busyness as a badge of honor, choosing to slow down is a radical act. Slow living isn't about doing everything at a snail's pace—it's about finding the right pace for you.

## What Slow Living Isn't

Let's clear up some misconceptions:

- It's not about being unproductive
- It's not only for people with flexible schedules
- It's not about rejecting technology entirely
- It's not a privilege only some can afford

## What Slow Living Is

Slow living is about intentionality. It's choosing quality over quantity, depth over breadth, presence over productivity.

It's asking: "Does this align with my values?" before saying yes to commitments. It's recognizing that your time and energy are finite resources worthy of protection.

## Practical Steps to Slow Down

**1. Audit your commitments**

List everything that regularly demands your time. For each item, ask: Does this bring value to my life? Is it necessary? Could it be simplified?

**2. Create margins**

Build buffer time between activities. The space between things is where life happens.

**3. Single-task**

Multitasking is a myth that fragments our attention. Do one thing at a time, fully.

**4. Embrace boredom**

Boredom is the birthplace of creativity. Resist the urge to fill every moment with stimulation.

**5. Protect your mornings**

Keep your first hours free from external demands when possible. This sets a calm tone for the day.

## The Slow Living Home

Your environment shapes your pace. Consider:

- Decluttering spaces that feel chaotic
- Creating cozy corners for rest and reflection
- Reducing visual noise (fewer decorations, calmer colors)
- Introducing elements from nature

## Slow Living in Relationships

Slow living extends to how we connect with others:

- Choose deep conversations over superficial exchanges
- Give people your undivided attention
- Prioritize quality time over Instagram-worthy experiences
- Learn to be fully present with loved ones

## The Paradox of Slow

Here's the beautiful paradox: when you slow down, you often accomplish more of what matters. Energy isn't wasted on urgency and anxiety. Decisions improve because you're not rushing. Relationships deepen because you're present.

Slow living isn't a destination—it's a continuous practice of choosing intention over autopilot, presence over distraction, meaning over busyness.

Start today. Pick one area of your life and slow it down. Notice what opens up when you stop rushing through.

`,
    category: "Lifestyle",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: path.join(assetsPath, "post-1.jpg"),
    slug: "slow-living",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 5,
    title: "Sunrise Walks: A Photo Journey",
    excerpt: "Join me on early morning beach walks that have transformed my perspective on starting each day with intention.",
    content: `
Six months ago, I started waking before dawn to walk along the beach. What began as an experiment has become the most treasured part of my day.

## The Decision

I'd read about the benefits of morning light exposure—better sleep, improved mood, increased energy. But honestly? I was skeptical. I've never been a morning person.

Still, something called me to try. Maybe it was burnout. Maybe it was curiosity. Whatever the reason, I set my alarm for 5:30 AM and committed to one week.

## The First Morning

That first walk was uncomfortable. My body protested the early hour. The air was cold. I questioned my sanity.

But then the sky began to change. First a deep indigo, then ribbons of pink and gold. By the time the sun crested the horizon, I was crying—overwhelmed by beauty I'd been sleeping through for years.

## What I've Learned

**The world is different at dawn**

There's a quality of stillness in the pre-dawn hours that doesn't exist at any other time. The world feels held, waiting, full of possibility.

**Small things become magnificent**

In the soft morning light, everything is beautiful. Dewdrops on sea grass. Footprints in wet sand. The way light spreads across the water.

**Movement is meditation**

Walking without destination, syncing my breath with my steps, I've discovered a form of moving meditation that quiets my busy mind.

## The Ritual

My morning walks have developed their own rhythm:

1. Wake naturally (no alarm needed anymore)
2. Warm drink in silence
3. Drive to the beach (still dark)
4. Walk until sunrise
5. Find a spot to sit and watch
6. Return home, heart full

## The Ripple Effects

These walks have changed more than my mornings. I sleep better. I'm more patient. I notice beauty more often throughout the day. I've made peace with solitude.

The camera I bring has become a tool for attention—not to capture moments for social media, but to practice really seeing.

## An Invitation

I'm not suggesting everyone needs to wake at 5 AM or walk on beaches. But I am suggesting there's magic in the early hours worth discovering.

Start with once a week. Go outside before sunrise, wherever you are. Watch the world wake up. See what you notice. See how it changes you.

The dawn has been waiting for you.
`,
    category: "Travel",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    image: path.join(assetsPath, "post-2.jpg"),
    slug: "sunrise-walks",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 6,
    title: "Sunday Brunch: Simple Pleasures",
    excerpt: "Discover the joy of leisurely weekend brunches and how they can become a cherished ritual for connection.",
    content: `
There's a reason brunch has become something of a cultural phenomenon. It's not really about the food (though that certainly helps). It's about the permission to linger.

## The Case for Ritual

In our productivity-obsessed culture, rituals offer something radical: permission to simply be. Sunday brunch, done well, is one such ritual.

## Elements of a Perfect Brunch

**1. No rushing**

Brunch should be leisurely. Clear your calendar. Let the morning unfold without time pressure.

**2. Beautiful simplicity**

You don't need elaborate recipes. Fresh bread, good butter, quality eggs, seasonal fruit—simple ingredients, prepared with care.

**3. Thoughtful setting**

Set a proper table. Use the nice dishes. Put flowers in a vase. These small touches signal: this moment matters.

**4. Connection**

Whether alone with a good book or gathered with loved ones, brunch is time for presence and connection.

## My Sunday Spread

Here's what a typical Sunday looks like at my table:

- Sourdough toast with cultured butter
- Soft-scrambled eggs with fresh herbs
- Seasonal fruit bowl
- Pot of good coffee or tea
- Fresh-squeezed juice

Nothing complicated. Everything delicious.

## Brunch for One

Solo brunch is its own pleasure. A quiet morning with a cookbook, a podcast, or simply your own thoughts. It's self-care in its most nourishing form.

## Brunch as Practice

Beyond the food, Sunday brunch can be a practice in:

**Presence** - Put away your phone. Taste your food. Notice the light.

**Gratitude** - Pause before eating to appreciate the abundance before you.

**Rest** - Resist the urge to multitask. This is time for renewal.

**Connection** - If dining with others, ask meaningful questions. Listen deeply.

## The Week Ahead

There's practical magic in Sunday brunch. It serves as a transition point—a gentle boundary between the week that was and the week to come.

Use this time to reflect, to reset, to set intentions. Not in a rigid, goal-setting way, but with the soft clarity that comes from rest.

## Creating Your Ritual

The perfect brunch is whatever nourishes you. Maybe it's elaborate cooking. Maybe it's takeout eaten mindfully. Maybe it's a smoothie on your balcony.

What matters is the intention: to slow down, to nourish yourself, to treat ordinary life as worthy of ceremony.

This Sunday, try it. Linger a little longer. Savor a little more. See what opens up when you give yourself permission to simply enjoy.
`,
    category: "Food & Lifestyle",
    date: "Dec 6, 2024",
    readTime: "5 min read",
    image: path.join(assetsPath, "post-3.jpg"),
    slug: "sunday-brunch",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 7,
    title: "Creating a Calm Home Space",
    excerpt: "Transform your living space into a sanctuary with these minimalist design principles and cozy touches.",
    content: `
Our homes are more than shelter—they're the backdrop to our lives. The spaces we inhabit shape our moods, our thoughts, and our sense of well-being.

## The Philosophy

Creating a calm home isn't about expensive renovations or perfect Instagram aesthetics. It's about intentionally shaping your space to support the life you want to live.

## Principles of Calm Design

**1. Less is more**

Every object in your home either adds to or detracts from your peace. Be ruthless about keeping only what you love, use, or truly need.

**2. Everything has a home**

Clutter often isn't about having too much stuff—it's about stuff without a place. Give everything a designated spot.

**3. Honor natural light**

Keep windows unobstructed. Choose lighter window treatments. Position seating to maximize daylight.

**4. Incorporate nature**

Plants, natural materials, views of greenery—these elements have measurable effects on stress and well-being.

**5. Create zones**

Define different areas for different activities. A reading nook. A work space. A rest space. Clear purposes prevent chaos.

## Room by Room

**The Entryway**

This is your transition space between world and home. Keep it clutter-free with storage for keys, bags, and shoes. Add something beautiful—a plant, artwork, a candle.

**The Living Room**

Choose comfort over style. Soft textures, good lighting, minimal visual clutter. This should be a space that invites lingering.

**The Bedroom**

Reserve this room for rest. No work materials. Minimal electronics. Invest in bedding that makes you want to sink in.

**The Kitchen**

Clear counters support both calm and function. Store appliances you don't use daily. Display only what brings you joy.

## The Art of Cozy

Calm doesn't mean cold or stark. Add warmth through:

- Soft throw blankets
- Layered lighting (avoid harsh overhead lights)
- Natural textures (wool, linen, wood, ceramics)
- Personal touches (photos, treasured objects, books)

## Maintenance Habits

A calm home requires ongoing care:

- 10-minute evening tidy
- Weekly reset of surfaces
- Monthly declutter of one area
- Seasonal deep cleaning and evaluation

## Start Where You Are

You don't need to transform your entire home at once. Start with one surface—a nightstand, a countertop, a desk. Experience the peace that clear space creates. Let that motivate you to continue.

Your home can be a sanctuary. Not through perfection, but through intention. Start today, with whatever you have, wherever you are.
`,
    category: "Home & Decor",
    date: "Dec 4, 2024",
    readTime: "7 min read",
    image: path.join(assetsPath, "post-4.jpg"),
    slug: "calm-home",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  },
  {
    id: 8,
    title: "Self-Care Sunday Rituals",
    excerpt: "Build a weekly self-care practice that nurtures your mind, body, and soul with these gentle wellness routines.",
    content: `
Self-care has become something of a buzzword, often associated with expensive products and picture-perfect bubble baths. But true self-care is simpler—and more profound—than marketing would have you believe.

## Redefining Self-Care

At its core, self-care is the practice of meeting your own needs. It's not selfish; it's necessary. You can't pour from an empty cup.

## The Case for Sunday

While self-care should happen daily, having one day dedicated to deeper restoration is powerful. Sunday works for many—it's a natural pause before the week begins again.

## Building Your Ritual

A good self-care ritual includes four elements:

**1. Body**
- Extended morning stretch or gentle yoga
- A longer shower or bath than usual
- Preparing nourishing food
- Rest and sleep

**2. Mind**
- Journaling or reflection
- Reading for pleasure
- Learning something new
- Mental decluttering

**3. Soul**
- Time in nature
- Creative expression
- Connection with loved ones
- Spiritual practice if that resonates

**4. Space**
- Tidying your environment
- Creating beauty in small ways
- Preparing for the week ahead

## A Sample Sunday

Here's how a self-care Sunday might unfold:

**Morning**
- Wake naturally, no alarm
- Gentle stretching in bed
- Slow breakfast with tea or coffee
- Journaling: reflection on the week past

**Midday**
- Outdoor time: walk, garden, sit in sunlight
- Nourishing lunch
- Creative time or pleasure reading

**Afternoon**
- Body care: longer shower, skin care, rest
- Light preparation for the week (meal prep, outfit planning)
- 10-minute space tidy

**Evening**
- Simple, early dinner
- Connection: call a friend, time with family
- Gentle wind-down routine
- Early bedtime

## Making It Your Own

This template is just a starting point. Your self-care Sunday should reflect your unique needs.

Ask yourself:
- What depletes me during the week?
- What restores me?
- What do I always wish I had time for?

Let your answers guide your ritual.

## Resistance and Permission

If self-care feels indulgent or impossible, that's a sign you need it most. Start with fifteen minutes. Give yourself permission.

Remember: taking care of yourself isn't a luxury. It's the foundation for everything else you want to do and be.

This Sunday, try something from this list. Notice how it feels to prioritize yourself. Let that feeling guide you forward.
`,
    category: "Wellness",
    date: "Dec 2, 2024",
    readTime: "5 min read",
    image: path.join(assetsPath, "post-5.jpg"),
    slug: "self-care-sunday",
    author: { name: "Antony Mwenda", avatar: path.join(assetsPath, "post-1.jpg") }
  }
];

export const featuredPosts = posts.slice(0, 3);
export const recentPosts = posts.slice(3);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return posts.slice(0, limit);

  return posts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit);
}

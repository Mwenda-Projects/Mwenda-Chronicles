-- Create posts table for blog content
CREATE TABLE public.posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL,
    image TEXT,
    author_name TEXT NOT NULL DEFAULT 'Anthony Mwenda',
    author_image TEXT DEFAULT '/lovable-uploads/08fe321c-ac2e-4db0-9e29-d477ae5ff5b4.png',
    author_role TEXT DEFAULT 'Author & Creator',
    read_time TEXT NOT NULL DEFAULT '5 min read',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts (for your Vercel site)
CREATE POLICY "Anyone can view published posts" 
ON public.posts 
FOR SELECT 
USING (is_published = true);

-- Admin policies (authenticated users can manage posts)
CREATE POLICY "Authenticated users can create posts" 
ON public.posts 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts" 
ON public.posts 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete posts" 
ON public.posts 
FOR DELETE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view all posts" 
ON public.posts 
FOR SELECT 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_posts_updated_at();

-- Create index for faster slug lookups
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_category ON public.posts(category);
CREATE INDEX idx_posts_is_featured ON public.posts(is_featured);
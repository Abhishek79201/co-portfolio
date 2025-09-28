# Abhishek Vaghela - Brutalist Developer Portfolio

A high-performance, brutalist-inspired developer portfolio built with Next.js 14, showcasing the professional journey and technical expertise of Abhishek Vaghela, a passionate Full Stack MERN developer.

## 🚀 Features

- **Brutalist Design**: Bold typography, minimal aesthetics, and raw functionality
- **Ultra-Fast Performance**: Static export with Next.js 14 for optimal loading speeds
- **SEO Optimized**: Comprehensive metadata, structured data, sitemap, and robots.txt
- **Responsive Design**: Mobile-first approach with tailored layouts for all devices
- **Analytics Ready**: Configurable tracking for Google Analytics, Meta Pixel, LinkedIn Insight Tag, and more
- **Accessibility**: Meets WCAG guidelines with proper semantic HTML and keyboard navigation
- **Performance Focused**: Lighthouse scores of 95+ across all metrics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with static export
- **Styling**: Tailwind CSS with custom brutalist components
- **Typography**: Inter font family with optimized loading
- **Animations**: CSS transforms and transitions (lightweight, GPU-accelerated)
- **SEO**: Next.js built-in SEO features with custom metadata
- **Analytics**: Configurable multi-platform tracking
- **Deployment**: Optimized for Vercel, Netlify, or static hosting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/abhishekvaghela/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## ⚙️ Configuration

### Analytics Setup

1. Navigate to `config/analytics.ts`
2. Set `enabled: true` to activate analytics
3. Add your tracking IDs either directly in the config or via environment variables:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_LINKEDIN_INSIGHT_ID=12345
```

### Content Updates

- **Personal Info**: Update contact details in `components/Contact.tsx`
- **Experience**: Modify work history in `components/Experience.tsx`
- **Projects**: Add/update projects in `components/Projects.tsx`
- **Skills**: Update technical skills in `components/About.tsx`

## 🎨 Design Philosophy

This portfolio embraces **brutalist design principles**:
- Raw, functional aesthetics over decorative elements
- Bold, oversized typography for maximum impact
- Minimal color palette with strategic accent usage
- Grid-based layouts with intentional white space
- Performance-first approach to user experience

## 📊 Performance

- **First Contentful Paint**: <500ms
- **Largest Contentful Paint**: <1.2s
- **Time to Interactive**: <1.5s
- **Cumulative Layout Shift**: <0.1
- **Lighthouse Performance**: 95+

## 🔧 Customization

The portfolio is built with modularity in mind:

- **Colors**: Modify the color palette in `globals.css`
- **Typography**: Adjust font weights and sizes using Tailwind classes
- **Layout**: Components are self-contained and easily modifiable
- **Animation**: CSS-based animations with respect for reduced motion preferences

## 📈 SEO Features

- Comprehensive meta tags and Open Graph data
- Structured data (JSON-LD) for search engines
- Automatic sitemap and robots.txt generation
- Canonical URLs and proper heading hierarchy
- Optimized images with Next.js Image component

## 🚀 Deployment

The portfolio is optimized for static hosting:

1. Build the static site:
```bash
npm run build
```

2. Deploy the `out` folder to your preferred hosting platform:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Any static hosting service

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome! Please feel free to open an issue or submit a pull request.

## 📞 Contact

**Abhishek Vaghela**
- Email: vaghelaabhishek2580@gmail.com
- Phone: +91 8200394360
- GitHub: [github.com/abhishekvaghela](https://github.com/abhishekvaghela)
- LinkedIn: [linkedin.com/in/abhishekvaghela](https://linkedin.com/in/abhishekvaghela)

---

*Built with Next.js, Tailwind CSS, and lots of ☕*
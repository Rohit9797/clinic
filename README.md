# MedCare Hospital Website

A comprehensive, responsive hospital/clinic website built with vanilla HTML, CSS, and JavaScript. Features modern design, accessibility compliance, and SEO optimization.

## 🏥 Features

### Pages
- **Home** - Hero section, stats, services preview, testimonials
- **About** - Mission, values, history, leadership team
- **Services** - Medical departments and diagnostic services
- **Doctors** - Searchable directory with filtering
- **Appointments** - Validated booking form with dependent dropdowns
- **Contact** - Contact information with embedded map
- **FAQ** - Accordion-style frequently asked questions
- **Blog** - Article listing with category filtering
- **Privacy Policy** - HIPAA-compliant privacy information
- **Terms of Service** - Legal terms and conditions
- **404 Error** - Custom error page with helpful navigation

### Technical Features
- **Responsive Design** - Mobile-first approach with breakpoints
- **Accessibility** - WCAG 2.1 AA compliant with ARIA labels
- **Dark Mode** - System preference detection + localStorage
- **SEO Optimized** - Meta tags, JSON-LD structured data, sitemap
- **Performance** - Lazy loading, optimized images, efficient CSS
- **Form Validation** - Real-time validation with error handling
- **Interactive Components** - Testimonial slider, stats counter, accordion

## 🎨 Design System

### Colors
- **Primary**: #0066cc (Medical Blue)
- **Secondary**: #14b8a6 (Teal)
- **Accent**: #f97316 (Orange)
- **Success**: #22c55e
- **Warning**: #eab308
- **Error**: #ef4444

### Typography
- **Font Family**: Inter (system fallbacks)
- **Fluid Typography**: clamp() for responsive text sizing
- **Line Heights**: 120% for headings, 150% for body text
- **Font Weights**: Normal (400), Medium (500), Semibold (600), Bold (700)

### Spacing
- **8px Base System**: Consistent spacing using CSS custom properties
- **Responsive Containers**: Max-width with fluid padding

## 🛠️ File Structure

```
/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services/departments
├── doctors.html            # Doctor directory
├── appointments.html       # Appointment booking
├── contact.html            # Contact information
├── faq.html               # FAQ with accordion
├── blog.html              # Blog listing
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── 404.html               # Error page
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
└── assets/
    ├── css/
    │   └── main.css       # Main stylesheet
    ├── js/
    │   ├── main.js        # Core functionality
    │   ├── forms.js       # Form handling
    │   └── doctors.js     # Doctor search/filter
    └── images/
        └── favicon.svg    # Site favicon
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local web server (for development)

### Installation
1. Clone or download the project files
2. Serve the files using a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

### Development
- **CSS**: All styles are in `/assets/css/main.css` using CSS custom properties
- **JavaScript**: Modular approach with separate files for different functionality
- **Images**: Uses Pexels stock photos with proper attribution
- **Icons**: Inline SVG icons for performance and customization

## ♿ Accessibility Features

- **Semantic HTML** - Proper heading hierarchy and landmarks
- **ARIA Labels** - Screen reader support for interactive elements
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Visible focus indicators
- **Color Contrast** - WCAG AA compliant contrast ratios
- **Skip Links** - Quick navigation for screen readers
- **Alternative Text** - Descriptive alt text for all images

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

### Features
- Mobile-first CSS approach
- Flexible grid layouts
- Responsive images with proper sizing
- Touch-friendly interactive elements
- Optimized navigation for mobile devices

## 🔍 SEO Optimization

### On-Page SEO
- Semantic HTML structure
- Optimized meta descriptions and titles
- Proper heading hierarchy (H1-H6)
- Internal linking structure
- Image optimization with alt text

### Structured Data (JSON-LD)
- Organization schema
- Hospital schema
- Physician schema
- Breadcrumb navigation
- FAQ page schema
- Blog/Article schema

### Technical SEO
- XML sitemap
- Robots.txt configuration
- Canonical URLs
- Open Graph meta tags
- Twitter Card meta tags

## 🎯 Performance Optimization

### Loading Performance
- Lazy loading for images
- Preload critical resources
- Optimized CSS delivery
- Minimal JavaScript footprint
- Efficient image formats and sizing

### Runtime Performance
- Debounced event handlers
- Efficient DOM manipulation
- CSS animations over JavaScript
- Intersection Observer for scroll effects
- Minimal reflows and repaints

## 🌙 Dark Mode

### Implementation
- CSS custom properties for theming
- System preference detection (`prefers-color-scheme`)
- localStorage persistence
- Smooth transitions between themes
- Accessible theme toggle button

### Usage
- Automatic detection of system preference
- Manual toggle via header button
- Preference saved across sessions
- Consistent theming across all pages

## 📋 Form Features

### Appointment Form
- Multi-step validation
- Dependent dropdown (department → doctor)
- Real-time error feedback
- Phone number formatting
- Date validation
- Consent checkboxes
- Success modal with appointment details

### Contact Form
- Subject categorization
- Message validation
- Privacy consent
- Success confirmation
- Error handling

## 🔧 Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers
- CSS Grid with Flexbox fallbacks

## 📊 Lighthouse Optimization

### Performance Targets
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Optimization Techniques
- Efficient CSS and JavaScript
- Optimized images and lazy loading
- Proper caching headers
- Minimal third-party resources
- Clean, semantic HTML

## 🤝 Contributing

### Code Style
- **CSS**: BEM methodology for class naming
- **JavaScript**: ES6+ with strict mode
- **HTML**: Semantic elements with proper ARIA
- **Comments**: Comprehensive documentation

### Best Practices
- Mobile-first responsive design
- Accessibility-first development
- Performance-conscious implementation
- SEO-optimized content structure
- Clean, maintainable code

## 📞 Support

For questions or support regarding this website:

- **Email**: info@medcare-hospital.com
- **Phone**: +1-555-MEDCARE
- **Emergency**: 911

## 📄 License

© 2024 MedCare Hospital. All rights reserved.

This website template is created for demonstration purposes. Modify as needed for your healthcare organization while maintaining accessibility and performance standards.
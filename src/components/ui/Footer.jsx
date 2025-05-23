import { Link } from 'react-router-dom'
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './icons/SocialIcons'

const Footer = () => {
  const footerLinks = [
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre nosotros', href: '/about' },
        { name: 'Contacto', href: '/contact' },
        { name: 'Trabaja con nosotros', href: '/careers' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Términos y condiciones', href: '/terms' },
        { name: 'Política de privacidad', href: '/privacy' },
        { name: 'Cookies', href: '/cookies' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Centro de ayuda', href: '/help' }
      ]
    }
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-white">ActiReserva</span>
            </Link>
            <p className="text-gray-300 text-sm">
              La mejor plataforma para descubrir y reservar actividades únicas en tu ciudad.
            </p>
            
            {/* Social media */}
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center">
            &copy; {new Date().getFullYear()} ActiReserva. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
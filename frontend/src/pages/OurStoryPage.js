"use client"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { useTheme } from "../contexts/ThemeContext"
import "../styles/OurStoryPage.css"

function OurStoryPage() {
  const { theme } = useTheme()

  return (
    <div className={`our-story-page ${theme === "dark" ? "dark" : "light"}`}>
      <Navbar />

      <main className="story-main">
        <div className="story-header">
          <h1 className="story-title">Our Story</h1>
          <p className="story-subtitle">The journey of Elegance - Pakistan's premier fashion destination</p>
        </div>

        <div className="story-content">
          <div className="story-section">
            <div className="story-image-container">
              <img src="/placeholder.svg?height=500&width=700" alt="Elegance Founding" className="story-image" />
            </div>

            <div className="story-text">
              <h2 className="section-title">Our Beginning</h2>
              <p>
                Elegance was founded in 2010 by Ayesha Khan, a passionate fashion designer with a vision to bring
                Pakistani traditional clothing to the global stage. What started as a small boutique in Lahore has now
                grown into one of Pakistan's most recognized fashion brands.
              </p>
              <p>
                Our journey began with a simple mission: to create clothing that celebrates the rich cultural heritage
                of Pakistan while embracing modern design sensibilities. Each piece in our collection tells a story of
                craftsmanship, tradition, and innovation.
              </p>
            </div>
          </div>

          <div className="story-section reverse">
            <div className="story-image-container">
              <img src="/placeholder.svg?height=500&width=700" alt="Elegance Craftsmanship" className="story-image" />
            </div>

            <div className="story-text">
              <h2 className="section-title">Our Craftsmanship</h2>
              <p>
                At Elegance, we believe in preserving the art of traditional Pakistani craftsmanship. We work closely
                with skilled artisans across Pakistan, many of whom have inherited their craft through generations. From
                intricate embroidery to delicate beadwork, every detail is meticulously crafted by hand.
              </p>
              <p>
                We take pride in supporting local communities and ensuring fair wages for our artisans. By choosing
                Elegance, you're not just buying a garment; you're supporting a tradition of excellence and helping to
                preserve cultural heritage.
              </p>
            </div>
          </div>

          <div className="story-section">
            <div className="story-image-container">
              <img src="/placeholder.svg?height=500&width=700" alt="Elegance Innovation" className="story-image" />
            </div>

            <div className="story-text">
              <h2 className="section-title">Our Innovation</h2>
              <p>
                While we honor tradition, we also embrace innovation. Elegance was the first Pakistani fashion brand to
                introduce 3D virtual try-on technology, allowing customers to experience our clothing in a whole new
                dimension. Our commitment to technological advancement has revolutionized the way people shop for
                traditional clothing.
              </p>
              <p>
                We continuously explore new techniques, materials, and designs to create clothing that is not only
                beautiful but also comfortable, durable, and sustainable. Our design team draws inspiration from
                Pakistan's rich cultural tapestry while keeping an eye on global fashion trends.
              </p>
            </div>
          </div>

          <div className="story-values">
            <h2 className="values-title">Our Values</h2>

            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">🌿</div>
                <h3>Sustainability</h3>
                <p>
                  We are committed to sustainable practices, from sourcing eco-friendly materials to reducing waste in
                  our production process.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">🤝</div>
                <h3>Community</h3>
                <p>
                  We support local communities by providing fair employment and preserving traditional craftsmanship.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">✨</div>
                <h3>Quality</h3>
                <p>
                  We never compromise on quality, ensuring that every garment meets our high standards of excellence.
                </p>
              </div>

              <div className="value-card">
                <div className="value-icon">🔄</div>
                <h3>Innovation</h3>
                <p>
                  We continuously innovate, blending traditional techniques with modern technology to create unique
                  experiences.
                </p>
              </div>
            </div>
          </div>

          <div className="story-team">
            <h2 className="team-title">Meet Our Team</h2>

            <div className="team-grid">
              <div className="team-member">
                <div className="member-image-container">
                  <img src="/placeholder.svg?height=300&width=300" alt="Ayesha Khan" className="member-image" />
                </div>
                <h3 className="member-name">Ayesha Khan</h3>
                <p className="member-role">Founder & Creative Director</p>
              </div>

              <div className="team-member">
                <div className="member-image-container">
                  <img src="/placeholder.svg?height=300&width=300" alt="Imran Ahmed" className="member-image" />
                </div>
                <h3 className="member-name">Imran Ahmed</h3>
                <p className="member-role">Head of Design</p>
              </div>

              <div className="team-member">
                <div className="member-image-container">
                  <img src="/placeholder.svg?height=300&width=300" alt="Sana Malik" className="member-image" />
                </div>
                <h3 className="member-name">Sana Malik</h3>
                <p className="member-role">Technology Director</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OurStoryPage


import "../styles/OurStoryPage.css"

const OurStoryPage = () => {
  return (
    <div className="our-story-page">
      <div className="story-hero">
        <div className="story-hero-content">
          <h1 className="story-title">Our Story</h1>
          <p className="story-subtitle">Bringing Pakistani fashion to the world stage</p>
        </div>
      </div>

      <div className="story-container">
        <section className="story-section">
          <div className="section-content">
            <h2 className="section-title">Our Beginning</h2>
            <p>
              Pakistani Fashion was founded in 2015 with a simple yet powerful vision: to showcase the rich textile
              heritage and craftsmanship of Pakistan to the world. What began as a small boutique in Lahore has now
              grown into an international brand, connecting artisans and designers with fashion enthusiasts across the
              globe.
            </p>
            <p>
              Our founder, Aisha Khan, a textile designer with over 15 years of experience, recognized the immense
              talent of local artisans and the unique beauty of Pakistani textiles. She set out to create a platform
              that would not only preserve traditional craftsmanship but also blend it with contemporary designs to
              appeal to the modern consumer.
            </p>
          </div>
          <div className="section-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Our founder in her first boutique" />
          </div>
        </section>

        <section className="story-section reverse">
          <div className="section-content">
            <h2 className="section-title">Our Mission</h2>
            <p>
              At Pakistani Fashion, our mission is to celebrate and promote the rich textile heritage of Pakistan while
              empowering local artisans and communities. We believe in sustainable fashion that honors tradition while
              embracing innovation.
            </p>
            <p>We are committed to:</p>
            <ul className="mission-list">
              <li>Supporting local artisans and preserving traditional craftsmanship</li>
              <li>Creating sustainable and ethical fashion</li>
              <li>Blending cultural heritage with contemporary design</li>
              <li>Providing exceptional quality and customer experience</li>
              <li>Sharing Pakistani culture and craftsmanship with the world</li>
            </ul>
          </div>
          <div className="section-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Artisans working on traditional embroidery" />
          </div>
        </section>

        <section className="story-section">
          <div className="section-content">
            <h2 className="section-title">Our Craftsmanship</h2>
            <p>
              Each piece in our collection tells a story of centuries-old traditions and meticulous craftsmanship. From
              the intricate embroidery of Sindhi artisans to the delicate threadwork of Kashmiri craftsmen, our products
              showcase the diverse textile heritage of Pakistan.
            </p>
            <p>
              We work directly with artisans across Pakistan, ensuring fair wages and sustainable practices. Many of our
              pieces take weeks or even months to create, with skilled hands bringing designs to life through techniques
              passed down through generations.
            </p>
            <p>
              Our commitment to quality means we use only the finest materials – from hand-loomed cotton and silk to
              ethically sourced embellishments. We believe that true luxury lies in the story behind each piece and the
              hands that crafted it.
            </p>
          </div>
          <div className="section-image">
            <img src="/placeholder.svg?height=400&width=600" alt="Close-up of intricate embroidery work" />
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title centered">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌿</div>
              <h3>Sustainability</h3>
              <p>
                We prioritize eco-friendly materials and processes, minimizing our environmental footprint while
                maximizing positive social impact.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>
                We support artisan communities through fair trade practices, skills development, and long-term
                partnerships.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔄</div>
              <h3>Heritage</h3>
              <p>We preserve and celebrate traditional craftsmanship while adapting it for the contemporary world.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>
                We never compromise on quality, ensuring each piece meets our exacting standards for materials,
                craftsmanship, and design.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title centered">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Aisha Khan" />
              </div>
              <h3>Aisha Khan</h3>
              <p className="member-title">Founder & Creative Director</p>
              <p className="member-bio">
                With over 15 years in textile design, Aisha's vision drives our brand's creative direction and
                commitment to artisanal craftsmanship.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Tariq Ahmed" />
              </div>
              <h3>Tariq Ahmed</h3>
              <p className="member-title">Head of Operations</p>
              <p className="member-bio">
                Tariq ensures our supply chain remains ethical and sustainable while maintaining the highest quality
                standards.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Sana Malik" />
              </div>
              <h3>Sana Malik</h3>
              <p className="member-title">Lead Designer</p>
              <p className="member-bio">
                Sana blends traditional Pakistani aesthetics with contemporary trends to create our signature
                collections.
              </p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src="/placeholder.svg?height=300&width=300" alt="Imran Hussain" />
              </div>
              <h3>Imran Hussain</h3>
              <p className="member-title">Artisan Relations Manager</p>
              <p className="member-bio">
                Imran works directly with our artisan communities, ensuring fair practices and preserving traditional
                techniques.
              </p>
            </div>
          </div>
        </section>

        <section className="journey-section">
          <h2 className="section-title centered">Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2015</h3>
                <p>Pakistani Fashion founded with a small boutique in Lahore</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2017</h3>
                <p>Expanded to online retail, shipping to customers across Pakistan</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2018</h3>
                <p>Launched our first international collection at Dubai Fashion Week</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2020</h3>
                <p>Began global shipping, bringing Pakistani fashion to customers worldwide</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2021</h3>
                <p>Established our Artisan Support Program to provide training and resources</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2023</h3>
                <p>Launched our innovative 3D shopping experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Join Our Journey</h2>
            <p>Experience the beauty of Pakistani fashion and support artisan communities</p>
            <a href="/categories" className="cta-button">
              Explore Our Collections
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OurStoryPage


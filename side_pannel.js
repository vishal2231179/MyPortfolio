document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const articleCards = document.querySelectorAll('.article-card');
    const sidePanel = document.getElementById('sidePanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const closeBtn = document.querySelector('.close-panel');
    const articleContent = document.getElementById('articleContent');
    const body = document.body;

    // Article content
    const articles = {
        'ux-design': `
            <h2>A Guide to Effective UX Design</h2>
            <p><strong>User Experience (UX) design</strong> is the process of creating products that provide meaningful and relevant experiences to users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.</p>
            
            <h3>Key Principles:</h3>
            <ul>
                <li><strong>User-Centered Design:</strong> Always design with the user's needs and behaviors in mind</li>
                <li><strong>Consistency:</strong> Maintain familiar patterns and predictable interactions</li>
                <li><strong>Hierarchy:</strong> Visual arrangement that implies importance</li>
                <li><strong>Accessibility:</strong> Design for users of all abilities</li>
                <li><strong>Context:</strong> Consider when and how the product will be used</li>
            </ul>
            
            <h3>Best Practices:</h3>
            <ol>
                <li>Conduct user research to understand needs and pain points</li>
                <li>Create user personas and journey maps</li>
                <li>Develop wireframes and prototypes early</li>
                <li>Test designs with real users frequently</li>
                <li>Iterate based on feedback</li>
            </ol>
            
            <div class="ux-tip">
                <strong>Pro Tip:</strong> Always validate your assumptions with real users through usability testing.
            </div>
        `,
        
        'color-psychology': `
            <h2>Color Psychology in UI Design</h2>
            <p>Colors profoundly impact how users perceive and interact with digital products. Understanding color psychology helps designers create interfaces that evoke the right emotions and drive desired actions.</p>
            
            <h3>Color Meanings:</h3>
            <div class="color-grid">
                <div class="color-item" style="background-color: #FF5252;">
                    <strong>Red:</strong> Energy, urgency, importance
                </div>
                <div class="color-item" style="background-color: #FFEB3B; color: #333;">
                    <strong>Yellow:</strong> Optimism, attention-grabbing
                </div>
                <div class="color-item" style="background-color: #4CAF50;">
                    <strong>Green:</strong> Growth, success, nature
                </div>
                <div class="color-item" style="background-color: #2196F3;">
                    <strong>Blue:</strong> Trust, security, calm
                </div>
                <div class="color-item" style="background-color: #9C27B0;">
                    <strong>Purple:</strong> Creativity, luxury
                </div>
                <div class="color-item" style="background-color: #000000;">
                    <strong>Black:</strong> Sophistication, power
                </div>
            </div>
            
            <h3>Application Tips:</h3>
            <ul>
                <li>Use warm colors (red, orange) for call-to-action buttons</li>
                <li>Cool colors (blue, green) work well for backgrounds</li>
                <li>Limit your palette to 2-3 primary colors</li>
                <li>Ensure sufficient color contrast for readability</li>
                <li>Consider cultural differences in color meanings</li>
            </ul>
        `,
        
        'sketch-prototype': `
            <h2>From Sketch to Prototype</h2>
            <p>Transforming static designs into interactive prototypes is a crucial step in the design process, allowing stakeholders to experience and test the product before development begins.</p>
            
            <h3>The Process:</h3>
            <ol>
                <li><strong>Sketching:</strong> Quick, low-fidelity drawings to explore ideas</li>
                <li><strong>Wireframing:</strong> Basic structural layout of interface elements</li>
                <li><strong>Mockups:</strong> High-fidelity static designs with colors and typography</li>
                <li><strong>Prototyping:</strong> Interactive simulations of the final product</li>
                <li><strong>User Testing:</strong> Validate designs with real users</li>
            </ol>
            
            <h3>Tools Comparison:</h3>
            <table>
                <tr>
                    <th>Tool</th>
                    <th>Best For</th>
                    <th>Learning Curve</th>
                </tr>
                <tr>
                    <td>Figma</td>
                    <td>Collaborative design</td>
                    <td>Moderate</td>
                </tr>
                <tr>
                    <td>Adobe XD</td>
                    <td>UI/UX design</td>
                    <td>Moderate</td>
                </tr>
                <tr>
                    <td>Sketch</td>
                    <td>Mac-based design</td>
                    <td>Easy</td>
                </tr>
                <tr>
                    <td>InVision</td>
                    <td>Prototyping</td>
                    <td>Easy</td>
                </tr>
            </table>
            
            <div class="protip">
                <strong>Prototyping Tip:</strong> Start with low-fidelity prototypes to test flow and functionality before investing time in high-fidelity designs.
            </div>
        `
    };

    // Open panel function
    function openPanel(articleId) {
        articleContent.innerHTML = articles[articleId];
        sidePanel.classList.add('open');
        panelOverlay.classList.add('active');
        body.classList.add('scroll');
        
        // Smooth scroll to top of panel content
        articleContent.scrollTo(0, 0);
    }

    // Close panel function
    function closePanel() {
        sidePanel.classList.remove('open');
        panelOverlay.classList.remove('active');
        body.classList.remove('scroll');
    }

    // Add click events to article cards
    articleCards.forEach(card => {
        const actionBtn = card.querySelector('.card-action');
        actionBtn.addEventListener('click', function() {
            const articleId = this.getAttribute('data-article');
            openPanel(articleId);
        });
    });

    // Close when X button is clicked
    closeBtn.addEventListener('click', closePanel);

    // Close when overlay is clicked
    panelOverlay.addEventListener('click', closePanel);

    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && panelOverlay.classList.contains('active')) {
            closePanel();
        }
    });
});


// Philosophy Content
document.addEventListener('DOMContentLoaded', function() {
    // Philosophy panel elements
    const philosophyBtn = document.getElementById('philosophyBtn');
    const philosophyPanel = document.getElementById('philosophyPanel');
    const philosophyOverlay = document.getElementById('philosophyOverlay');
    const closePhilosophy = document.getElementById('closePhilosophy');
    const body = document.body;

    // Open philosophy panel
    philosophyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        philosophyPanel.classList.add('open');
        philosophyOverlay.classList.add('active');
        body.classList.add('scroll');
    });

    // Close philosophy panel
    function closePhilosophyPanel() {
        philosophyPanel.classList.remove('open');
        philosophyOverlay.classList.remove('active');
        body.classList.remove('scroll');
    }

    // Close when X button is clicked
    closePhilosophy.addEventListener('click', closePhilosophyPanel);

    // Close when overlay is clicked
    philosophyOverlay.addEventListener('click', closePhilosophyPanel);

    // Close when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && philosophyOverlay.classList.contains('active')) {
            closePhilosophyPanel();
        }
    });
});
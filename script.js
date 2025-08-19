// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling with mobile-friendly offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Different offset for mobile vs desktop
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 80 : 70;
                const offsetTop = target.offsetTop - offset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect with mobile optimization
    const navbar = document.querySelector('.navbar');
    const debouncedNavbarScroll = debounce(function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedNavbarScroll);

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu on resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const text = 'Software Engineer';
        let i = 0;
        typewriterElement.textContent = '';
        
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Skill progress bars animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Fade in animations
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Apply fade animation to elements
    const fadeElements = document.querySelectorAll('.timeline-item, .project-card, .info-card, .skill-item');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Project modal functionality
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const closeModal = document.querySelector('.modal-close');

    // Project data
    const projectData = {
        deim: {
            title: 'ドライアイ予防のための意識的瞬目促進システムの開発',
            description: `
                <div class="modal-project-content">
                    <h2>ドライアイ予防のための意識的瞬目促進システムの開発</h2>
                    <div class="project-details">
                        <div class="project-section">
                            <h3>プロジェクト概要</h3>
                            <p>コンピュータビジョン技術を活用し、リアルタイムで瞬目パターンを解析してドライアイ予防のための適切なタイミングで瞬目を促すWebアプリケーションを開発しました。</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>技術的特徴</h3>
                            <ul>
                                <li><strong>リアルタイム瞬目検出</strong>: OpenCVとMediaPipeを使用した高精度な眼部検出</li>
                                <li><strong>機械学習による解析</strong>: 瞬目パターンの分析と個人最適化</li>
                                <li><strong>WebRTC活用</strong>: ブラウザベースのリアルタイム映像処理</li>
                                <li><strong>FastAPI バックエンド</strong>: 高パフォーマンスなAPI設計</li>
                                <li><strong>レスポンシブUI</strong>: 直感的で使いやすいインターフェース</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>成果</h3>
                            <ul>
                                <li>DEIM2025（第17回データ工学と情報マネジメントに関するフォーラム）で主著として発表</li>
                                <li><strong>学生プレゼンテーション賞</strong>を受賞</li>
                                <li>実用的なヘルスケアアプリケーションとして高い評価を獲得</li>
                            </ul>
                        </div>
                        
                        <div class="project-tech-stack">
                            <h3>使用技術</h3>
                            <div class="tech-grid">
                                <span class="tech-item">Python</span>
                                <span class="tech-item">geminiAPI</span>
                                <span class="tech-item">MediaPipe</span>
                                <span class="tech-item">FastAPI</span>
                                <span class="tech-item">TypeScript</span>
                                <span class="tech-item">Next.js</span>
                                <span class="tech-item">Docker</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            github: 'https://github.com/tacho-bana/ConsciousBlinkingApp'
        },
        mirai: {
            title: 'ギター初心者を対象とした音声特徴抽出によるエフェクター自動選択機能の実現',
            description: `
                <div class="modal-project-content">
                    <h2>ギターエフェクター自動選択システム</h2>
                    <div class="project-details">
                        <div class="project-section">
                            <h3>プロジェクト概要</h3>
                            <p>音声特徴抽出技術と機械学習を組み合わせ、ギター初心者の演奏に最適なエフェクターを自動選択するシステムを開発。音楽技術とデータサイエンスを融合した革新的なアプリケーションです。</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>技術的特徴</h3>
                            <ul>
                                <li><strong>音響解析エンジン</strong>: FFTを用いた周波数解析と音色特徴抽出</li>
                                <li><strong>機械学習モデル</strong>: scikit-learnを用いた分類アルゴリズム</li>
                                <li><strong>リアルタイム処理</strong>: 低遅延でのオーディオ処理実装</li>
                                <li><strong>直感的UI</strong>: 初心者でも使いやすいインターフェース設計</li>
                                <li><strong>エフェクト最適化</strong>: 演奏スタイルに応じたパラメータ自動調整</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>成果</h3>
                            <ul>
                                <li>武蔵野大学データサイエンス学部「未来創造プロジェクト」で発表</li>
                                <li><strong>学科賞</strong>を受賞</li>
                                <li>音楽教育分野での実用性が高く評価された</li>
                                <li>技術的な革新性と社会的意義を両立したプロジェクト</li>
                            </ul>
                        </div>
                        
                        <div class="project-tech-stack">
                            <h3>使用技術</h3>
                            <div class="tech-grid">
                                <span class="tech-item">Python</span>
                                <span class="tech-item">scikit-learn</span>
                                <span class="tech-item">Opensmile</span>
                                <span class="tech-item">SciPy</span>
                                <span class="tech-item">librosa</span>
                                <span class="tech-item">音響解析</span>
                                <span class="tech-item">機械学習</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        isekai: {
            title: '異世界レシピ - 創作料理レシピ共有プラットフォーム',
            description: `
                <div class="modal-project-content">
                    <h2>異世界レシピ</h2>
                    <div class="project-details">
                        <div class="project-section">
                            <h3>プロジェクト概要</h3>
                            <p>技育CAMP2025 Vol.4で開発したチーム開発プロジェクト。創作料理のレシピを共有できるユニークなプラットフォームを4人チームで制作し、努力賞を受賞しました。</p>
                        </div>
                        
                        <div class="project-section">
                            <h3>開発内容</h3>
                            <ul>
                                <li><strong>レシピ投稿機能</strong>: 画像付きでオリジナルレシピを投稿</li>
                                <li><strong>ソーシャル機能</strong>: いいね機能とコメントシステム</li>
                                <li><strong>検索・フィルタ機能</strong>: 材料や難易度での絞り込み</li>
                                <li><strong>ユーザー認証</strong>: 安全なアカウント管理システム</li>
                                <li><strong>レスポンシブデザイン</strong>: スマートフォン対応UI</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>チーム開発での役割</h3>
                            <ul>
                                <li>フロントエンドの設計と実装を主担当</li>
                                <li>UIコンポーネントの作成とスタイリング</li>
                                <li>API連携とデータバインディング</li>
                                <li>チーム内でのコードレビューと品質管理</li>
                            </ul>
                        </div>
                        
                        <div class="project-section">
                            <h3>学んだこと</h3>
                            <ul>
                                <li>チーム開発でのGitワークフローの実践</li>
                                <li>アジャイル開発手法の体験</li>
                                <li>限られた時間での効率的なプロダクト開発</li>
                                <li>ユーザー体験を重視したUI/UX設計</li>
                            </ul>
                        </div>
                        
                        <div class="project-tech-stack">
                            <h3>使用技術</h3>
                            <div class="tech-grid">
                                <span class="tech-item">Python</span>
                                <span class="tech-item">geminiAPI</span>
                                <span class="tech-item">MediaPipe</span>
                                <span class="tech-item">FastAPI</span>
                                <span class="tech-item">TypeScript</span>
                                <span class="tech-item">Next.js</span>
                                <span class="tech-item">Docker</span>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            github: 'https://github.com/tacho-bana/camp-06'
        }
    };

    // Project modal event listeners
    document.querySelectorAll('[data-project]').forEach(button => {
        button.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                modalContent.innerHTML = project.description;
                
                // Add GitHub link if available
                if (project.github) {
                    modalContent.innerHTML += `
                        <div class="modal-actions" style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
                            <a href="${project.github}" target="_blank" class="project-btn github" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                                <i class="fab fa-github"></i> GitHubで詳細を見る
                            </a>
                        </div>
                    `;
                }
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal functionality
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    // Close modal when clicking outside
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalFunction();
        }
    });

    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Add active nav link highlighting with mobile support
    const allNavLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        let current = '';
        const isMobile = window.innerWidth <= 768;
        const threshold = isMobile ? 120 : 100;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= threshold && sectionTop + sectionHeight > threshold) {
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    const debouncedHighlight = debounce(highlightActiveLink, 10);
    window.addEventListener('scroll', debouncedHighlight);

    // Initialize animations and interactions
    setTimeout(() => {
        // Trigger initial animations
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
        }
    }, 100);

    // Add modal project content styles
    const modalStyles = `
        <style>
        .modal-project-content h2 {
            color: #2d3748;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .project-details {
            max-width: 800px;
        }
        
        .project-section {
            margin-bottom: 2rem;
        }
        
        .project-section h3 {
            color: #2b6cb0;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .project-section p {
            line-height: 1.7;
            color: #4a5568;
            margin-bottom: 1rem;
        }
        
        .project-section ul {
            list-style: none;
            padding: 0;
        }
        
        .project-section li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #4a5568;
            line-height: 1.6;
        }
        
        .project-section li::before {
            content: '▶';
            position: absolute;
            left: 0;
            color: #2b6cb0;
            font-size: 0.8rem;
        }
        
        .project-section li strong {
            color: #2d3748;
        }
        
        .project-tech-stack {
            background: #f7fafc;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #2b6cb0;
        }
        
        .tech-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .tech-item {
            background: #2b6cb0;
            color: white;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .modal-actions {
            text-align: center;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e2e8f0;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-based functions
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based functionality here
}, 10);
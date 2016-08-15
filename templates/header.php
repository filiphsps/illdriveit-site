<?php if(count(get_included_files()) ==1) exit("Unauthorized."); ?>
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-79390901-1', 'auto');
    ga('send', 'pageview');
</script>

<header>
    <nav class="navbar">
        <div class="container-fluid">
            <div class="navbar-header">
                <button class="navbar-toggle collapsed" data-target="#navbar-collapse-1" data-toggle="collapse" type="button">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topnav" href="/">
                    <img alt="Home" class="img-responsive logo" src="/assets/img/logo.png">
                </a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right text-center">
                    <li>
                        <a href="/inspections/" title="Inspections">
                            <div>
                                <img alt="Inspections" class="img-responsive fix-icon" src="/assets/img/launcpad.png">
                            </div>
                            <span>LAUNCH PAD</span>
                        </a>
                    </li>

                    <li>
                        <a href="/forcefield/" title="Forcefield">
                            <div>
                                <img alt="Forcefield" class="img-responsive" src="/assets/img/warrantyitem.png">
                            </div>
                            <span>FORCEFIELD</span>
                        </a>
                    </li>

                    <li>
                        <a href="/training/" title="Training">
                            <div>
                                <img alt="Training" class="img-responsive" src="/assets/img/trainingitem.png">
                            </div>
                            <span>TRAINING</span>
                        </a>
                    </li>

                    <li>
                        <a href="/locations/" title="Locations">
                            <div>
                                <img alt="Locations" class="img-responsive" src="/assets/img/locationsitem.png">
                            </div>
                            <span>LOCATIONS</span>
                        </a>
                    </li>

                    <li>
                        <a href="/contact/" title="Contact">
                            <div>
                                <img alt="Contact" class="img-responsive" src="/assets/img/aboutitem.png">
                            </div>
                            <span>ABOUT US</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
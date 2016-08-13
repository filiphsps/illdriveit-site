<?php if(count(get_included_files()) ==1) exit("Unauthorized."); ?>
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
                    <img alt="Home" class="img-responsive logo" src="/images/logo.png">
                </a>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right text-center">
                    <li>
                        <a href="/inspections/" title="Inspections">
                            <div>
                                <img alt="Inspections" class="img-responsive fix-icon" src="/images/launcpad.png">
                            </div>
                            <span>LAUNCH PAD</span>
                        </a>
                    </li>

                    <li>
                        <a href="/forcefield/" title="Forcefield">
                            <div>
                                <img alt="Forcefield" class="img-responsive" src="/images/warrantyitem.png">
                            </div>
                            <span>FORCEFIELD</span>
                        </a>
                    </li>

                    <li>
                        <a href="/training/" title="Training">
                            <div>
                                <img alt="Training" class="img-responsive" src="/images/trainingitem.png">
                            </div>
                            <span>TRAINING</span>
                        </a>
                    </li>

                    <li>
                        <a href="/locations/" title="Locations">
                            <div>
                                <img alt="Locations" class="img-responsive" src="/images/locationsitem.png">
                            </div>
                            <span>LOCATIONS</span>
                        </a>
                    </li>

                    <li>
                        <a href="/contact/" title="Contact">
                            <div>
                                <img alt="Contact" class="img-responsive" src="/images/aboutitem.png">
                            </div>
                            <span>ABOUT US</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
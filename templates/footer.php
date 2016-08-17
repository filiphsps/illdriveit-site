<?php if(count(get_included_files()) ==1) exit("Unauthorized."); ?>
<footer>
    <!-- Floating "call" box -->
    <div class="call-box">
        <a class="button round-img-button" href="tel:+18003257484">
        <div class="banner">
            Call us
        </div>
        <img src="/assets/img/phone.png"></a>
    </div>

    <span class="copyrights">
        &copy; 2016 illdrive.it, <a href="https://www.illdrive.it/terms/">Terms And Conditions</a>
        <?php
            if (isset($title) && strtoupper($title) == 'HOME') :
        ?>
            <span>
                <br/>
                This website and all materials used for marketing that refer you to this site use the terms “Warranty”, “Extended Warranty”, “Vehicle Service Contract”, and “Extended Service Protection Plans” as equivalents for marketing purposes only. illdrive.it is offering vehicle service contracts on our website that are administered by MBPI Inc and underwritten by AmTrust Insurance Inc. Only automobile manufacturers can offer extended car warranties. All sales are subject to the terms located within the vehicle service contract and are also bound to the laws and regulations of the state the contract is sold. Please refer to the vehicle service contract for details.
            </span>
        <?php
            endif;
        ?>
    </span>
</footer>

<script src="/assets/js/jquery.js"></script>
<script src="/assets/js/bootstrap.min.js"></script>
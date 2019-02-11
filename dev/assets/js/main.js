document.addEventListener("DOMContentLoaded", function () {

    // custom select

    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

// add active class for panel item and show/hide dashboard

    const panelItems = document.getElementsByClassName('panel-item');
    const dashboardStyle = document.querySelector('.dashboard').style;
    const projectsBlocksStyle = document.querySelector('.projects-block').style;
    const togglePanel = document.querySelector('.toggle-panel');
    const toggleItems = togglePanel.getElementsByClassName('toggle-item');
    for (let item of panelItems) {
        item.addEventListener("click", function (e) {
            for (let item of panelItems) {
                if (!item.classList.contains('logout')) {
                    item.classList.remove('panel-active');
                }
            }
            if (this.classList.contains('board')) {
                dashboardStyle.display = 'block';
            } else {
                dashboardStyle.display = 'none';
            }
        });
    }
    for (let item of toggleItems) {
        item.addEventListener('click', function (e) {
            if (!this.classList.contains('toggle-item-active') && !this.classList.contains('active-project')) {
                for (let item of toggleItems) {
                    item.classList.remove('toggle-item-active');
                }
                this.classList.add('toggle-item-active');
                projectsBlocksStyle.display = 'none';
            } else if (!this.classList.contains('toggle-item-active')) {
                for (let item of toggleItems) {
                    item.classList.remove('toggle-item-active');
                }
                this.classList.add('toggle-item-active');
                projectsBlocksStyle.display = 'flex';
            }
        });
    }
});

// initiate custom scrollbar

jQuery(document).ready(function () {
    jQuery('.scrollbar-dynamic').scrollbar();
});
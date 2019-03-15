"use strict";function validateEmail(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(String(e).toLowerCase())}function idIsHovered(e){return $("#"+e+":hover").length>0}function setTestimonial(e){var t=$("#testimonial .customer");t.addClass("animated fadeOut"),setTimeout(function(){t.removeClass("fadeOut fadeIn"),t.find(".message").text("“"+e.message+"”"),t.find(".user .name").text(e.name),t.find(".user .work").text(e.work),t.addClass("animated fadeIn")},500)}function onNavClick(e){$(".tab-nav .nav").removeClass("active"),$("#feature-"+e).addClass("active"),showTab(e)}function showTab(e){$(".tab-content .content").hide(),$("#tab-"+e).show()}$(document).ready(function(){showTab(1);var e=[{name:"Rashed kabir",work:"Designer",message:"Having a home based business is a wonderful asset to your life. The problem still stands, when it comes timeadvertise your business for a cheap cost. I know you have looked for to answer everywhere; I am here to share a few simple creative ways"},{name:"Cuong 88",work:"Better",message:"This is awesome! I love it! Best wallet app for crypto currency."},{name:"Phuoc Le",work:"CEO",message:"I am rich and this app help me control and use all my money."}],t=0;setTestimonial(e[t]),setInterval(function(){idIsHovered("testimonial")||(t=t<e.length-1?t+1:0,setTestimonial(e[t]))},8e3),$("#next-testimonial").click(function(a){a.preventDefault(),t=t<1?e.length-1:t-1,setTestimonial(e[t])}),$("#prev-testimonial").click(function(a){a.preventDefault(),t=t<e.length-1?t+1:0,setTestimonial(e[t])}),$("#contact-form").on("submit",function(e){e.preventDefault();var t=$("#email-input").val(),a=$("#contact-form .submit-result");return validateEmail(t)?(a.removeClass("error"),a.text(""),$("#contact-form .submit-button").attr("disabled",!0),$("#contact-form .loading").show(),$("#contact-form .text").text("Sending..."),void setTimeout(function(){$("#contact-form .loading").hide(),$("#contact-form .text").text("Send Message"),$("#contact-form").trigger("reset"),a.addClass("success"),$("#contact-form .submit-button").attr("disabled",!1),a.text("Thank you for getting in touch with us! We will contact you shortly!")},5e3)):(a.text("Email address is invalid!"),void a.addClass("error"))})});3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function idIsHovered(id) {
  return $("#" + id + ":hover").length > 0;
}

function setTestimonial(testimonial) {
  const customer = $('#testimonial .customer');
  customer.addClass('animated fadeOut');
  setTimeout(function () {
    customer.removeClass('fadeOut fadeIn');
    customer.find('.message').text('“' + testimonial.message + '”');
    customer.find('.user .name').text(testimonial.name);
    customer.find('.user .work').text(testimonial.work);
    customer.addClass('animated fadeIn');
  }, 500);
}

function onNavClick(number) {
  $('.tab-nav .nav').removeClass('active');
  $('#feature-' + number).addClass('active');
  showTab(number);
}

function showTab(number) {
  $('.tab-content .content').hide();
  $('#tab-' + number).show();
}

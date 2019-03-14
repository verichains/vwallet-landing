$(document).ready(function () {
  showTab(1);

  const testimonials = [
    {
      name: 'Rashed kabir',
      work: 'Designer',
      message: 'Having a home based business is a wonderful asset to your life. The problem still stands, when it comes timeadvertise your business for a cheap cost. I know you have looked for to answer everywhere; I am here to share a few simple creative ways'
    },
    {
      name: 'Cuong 88',
      work: 'Better',
      message: 'This is awesome! I love it! Best wallet app for crypto currency.'
    },
    {
      name: 'Phuoc Le',
      work: 'CEO',
      message: 'I am rich and this app help me control and use all my money.'
    },
  ];

  let index = 0;
  setTestimonial(testimonials[index]);

  setInterval(() => {
    if (!idIsHovered('testimonial')) {
      index = index < (testimonials.length - 1) ? index + 1 : 0;
      setTestimonial(testimonials[index]);
    }
  }, 8000);


  $("#next-testimonial").click(function (event) {
    event.preventDefault();
    index = index < 1 ? testimonials.length - 1 : index - 1;
    setTestimonial(testimonials[index]);
  });

  $("#prev-testimonial").click(function (event) {
    event.preventDefault();
    index = index < (testimonials.length - 1) ? index + 1 : 0;
    setTestimonial(testimonials[index]);
  });
});

function idIsHovered(id) {
  return $("#" + id + ":hover").length > 0;
}

function setTestimonial(testimonial) {
  const customer = $('#testimonial .customer');
  customer.addClass('animated fadeOut');
  setTimeout(() => {
    customer.removeClass('fadeOut fadeIn');
    customer.find('.message').text('“' + testimonial.message + '”');
    customer.find('.user .name').text(testimonial.name);
    customer.find('.user .work').text(testimonial.work);
    customer.addClass('animated fadeIn');
  }, 500);
}

function prevTestimonial() {

}

function nextTestimonial() {

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

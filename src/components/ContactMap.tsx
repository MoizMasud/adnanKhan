import React from 'react';

const ContactMap = () => {
  return (
    <section className="w-full">
      <div className="h-[500px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93058.72835929248!2d-80.38764074179688!3d43.39739399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b8b168a461d81%3A0x5037b28c7231b60!2sCambridge%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cambridge, Ontario Location"
        />
      </div>
    </section>
  );
};

export default ContactMap;

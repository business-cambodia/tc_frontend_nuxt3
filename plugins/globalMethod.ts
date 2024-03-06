export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate(d: Date) {
        var date = new Date(d);
        var months = [
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ];

        var day = date.getDate();
        var month = months[date.getMonth()];
        return month + " " + day + " " + date.getFullYear();
      },
      kFormatter: (num: number): string | number => {
        if (Math.abs(num) > 999) {
          return Math.sign(num) * +(Math.abs(num) / 1000).toFixed(1) + " K";
        } else return Math.sign(num) * Math.abs(num);
      },

      calculateReadTime(body: string) {
        const wordsPerMinute = 70;
        let result;
        if (body != undefined) {
          let regex = /(<([^>]+)>)/gi;
          const newBody = body.replace(regex, "");
          let textLength = newBody.split(" ").length;
          if (textLength > 0) {
            let value = Math.ceil(textLength / wordsPerMinute);
            if (value <= 1) {
              result = `${value} min read`;
            } else {
              result = `${value} mins read`;
            }
          }
          return result;
        }
      },

      handleAdClick: async (slug: string) => {
        try {
          await useApi("/advertisement/clicks/" + slug, {
            method: "GET",
          });
          // console.log(slug + ' clicked')
        } catch (error) {}
      },
      handleAdSeen: async (slug: string) => {
        try {
          await useApi("/advertisement/impressions/" + slug, {
            method: "GET",
          });
          // console.log(slug + ' seen')
        } catch (error) {}
      },
    },
  };
});

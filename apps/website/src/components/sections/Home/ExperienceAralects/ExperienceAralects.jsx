import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const ExperienceAralects = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "https://api.aralects.com/v1/newsletter/subscriber/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-20">
      <section className="relative isolate flex flex-col items-center justify-around overflow-hidden rounded-2xl bg-[#393939]  text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="115"
          height="80"
          viewBox="0 0 115 80"
          fill="none"
          className="absolute left-0 top-0 -z-[1] w-[120px] md:hidden"
        >
          <g opacity="0.25">
            <path
              d="M-0.289822 13.011C-0.687584 28.4067 5.62138 43.3094 14.7673 53.8353C23.9132 64.3611 35.6555 70.9214 47.672 75.2739C58.9584 79.3619 71.1125 81.6319 82.4464 77.7476C102.8 70.772 116.288 43.1828 113.678 17.4009C111.067 -8.38077 93.9832 -30.2866 73.5946 -37.1044C46.1268 -46.2895 0.794383 -28.9514 -0.289822 13.011Z"
              fill="#6C49A7"
              stroke="#1F1F1F"
              stroke-width="0.173713"
              stroke-miterlimit="10"
            />
            <path
              d="M79.9632 43.4722C80.7052 39.9699 80.8928 36.2018 80.7004 32.6133C79.4705 9.67725 61.1511 -17.1573 40.8113 -16.0288C24.3699 -15.1166 2.57435 0.149647 5.60047 22.7158C7.27107 35.1737 15.6057 45.0821 25.0487 50.2642C34.4916 55.4463 45.0173 56.7045 55.3269 57.895C61.9958 58.6651 69.4103 59.1835 74.6558 54.1052C77.4084 51.4405 79.0792 47.6449 79.9632 43.4722Z"
              fill="#222222"
              stroke="#1F1F1F"
              stroke-width="0.173713"
              stroke-miterlimit="10"
            />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="67"
          height="80"
          viewBox="0 0 67 80"
          fill="none"
          className="absolute bottom-0 right-0 -z-[1] w-[120px] md:hidden"
        >
          <g opacity="0.25">
            <path
              d="M115.29 53.011C115.688 68.4067 109.379 83.3094 100.233 93.8352C91.0868 104.361 79.3445 110.921 67.328 115.274C56.0416 119.362 43.8875 121.632 32.5536 117.748C12.2002 110.772 -1.28772 83.1828 1.32248 57.4009C3.93265 31.6192 21.0168 9.71345 41.4054 2.89559C68.8732 -6.28954 114.206 11.0486 115.29 53.011Z"
              fill="#6C49A7"
              stroke="#1F1F1F"
              stroke-width="0.173713"
              stroke-miterlimit="10"
            />
            <path
              d="M35.0368 83.4722C34.2948 79.9699 34.1072 76.2018 34.2996 72.6133C35.5295 49.6773 53.8489 22.8427 74.1887 23.9712C90.6301 24.8834 112.426 40.1496 109.4 62.7158C107.729 75.1737 99.3943 85.0821 89.9513 90.2642C80.5084 95.4463 69.9827 96.7045 59.6731 97.895C53.0042 98.6651 45.5897 99.1835 40.3442 94.1052C37.5916 91.4405 35.9208 87.6449 35.0368 83.4722Z"
              fill="#222222"
              stroke="#1F1F1F"
              stroke-width="0.173713"
              stroke-miterlimit="10"
            />
          </g>
        </svg>
        <img
          src="/img/letters33.png"
          alt=""
          className="absolute bottom-0 left-0 -z-[1] hidden object-contain xl:block"
        />

        <div className="flex w-full flex-row items-start px-5 py-[60px] md:px-12 xl:px-16">
          <div className="w-full lg:w-[70%]">
            <h2 className="font-SpaceGroteskBold text-2xl font-bold md:text-left md:text-6xl">
              Want to be the first to experience Aralects?
            </h2>

            <div className="mt-6 flex flex-col gap-4 md:w-[70%]">
              <p className="font-SpaceGrotesk md:w-[90%] md:text-left md:text-xl">
                Step into a world where Arabic learning is real, personal, and
                alive.
              </p>
              <p className="font-SpaceGrotesk text-glow text-[#EADFFF] md:w-[90%] md:text-left md:text-xl">
                Sign up today and be part of our community as we prepare to
                launch!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="relative flex w-fit flex-col items-stretch justify-between  gap-y-2 rounded-full sm:flex-row sm:border sm:border-[#8262B0]">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="font-SpaceGrotesk w-full rounded-full border border-[#8262B0] bg-transparent px-4 py-2 text-white focus:outline-none sm:w-60 sm:border-none xl:w-80"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="font-SpaceGrotesk whitespace-nowrap rounded-full bg-[#a07ed1] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#a07ed1]/90 disabled:cursor-not-allowed disabled:opacity-70 md:w-fit"
                >
                  {isLoading ? "Joining..." : "Join waiting list"}
                </button>
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {success && (
                <p className="mt-4 text-sm text-green-400">
                  Thank you for joining our waiting list!
                </p>
              )}
            </form>
          </div>

          <img
            src="/img/art225.png"
            alt=""
            className="absolute right-0 top-0 -z-[1] ml-auto hidden h-full object-contain lg:block"
          />
        </div>
      </section>
    </div>
  );
};

export default ExperienceAralects;

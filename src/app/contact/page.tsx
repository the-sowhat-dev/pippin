import ProfileImage from '../components/profile-image';

export default function Page() {
  return <>
    <main className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-300'>
      <div className=' px-10 sm:px-20 2xl:px-40 grid grid-cols-2 gap-5 w-full h-full place-items-center'>
        <ProfileImage imagePath="/raph.png" imageAlt="Raphaël Metrop profile image" title="CEO" text="Raphaël METROP" link="rapha%C3%ABl-metrop-05714323" />
        <ProfileImage imagePath="/hugo.png" imageAlt="Hugo Bayoud profile image" title="CTO" text="Hugo BAYOUD" link="hugo-bayoud-4aa927194" />
      </div>
      <div className='fixed text-center bottom-0 pb-14 box-container'>
        <button>
          <div className='ibe'>
            <div>Vous préfèrez une adresse email ?</div>
            <p className='text-box'>hello@sowhat-app.com</p>
          </div>
        </button>
      </div>
    </main>
  </>
}
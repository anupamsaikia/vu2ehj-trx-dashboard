export default function Navbar() {
  return (
    <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div class="flex-1 px-2 mx-2">
        <span class="text-lg font-bold">VU2EHJ TRX Dashboard</span>
      </div>

      <div class="flex-none">
        <select
          data-choose-theme
          class="bg-base-200 text-base-content select select-bordered select-primary select-sm w-full max-w-xs"
        >
          <option value="">Default</option>
          <option value="light">light</option>
          <option value="dark">dark</option>
          <option value="cupcake">cupcake</option>
          <option value="bumblebee">bumblebee</option>
          <option value="emerald">emerald</option>
          <option value="corporate">corporate</option>
          <option value="synthwave">synthwave</option>
          <option value="retro">retro</option>
          <option value="cyberpunk">cyberpunk</option>
          <option value="valentine">valentine</option>
          <option value="halloween">halloween</option>
          <option value="garden">garden</option>
          <option value="forest">forest</option>
          <option value="aqua">aqua</option>
          <option value="lofi">lofi</option>
          <option value="pastel">pastel</option>
          <option value="fantasy">fantasy</option>
          <option value="wireframe">wireframe</option>
          <option value="black">black</option>
          <option value="luxury">luxury</option>
          <option value="dracula">dracula</option>
          <option value="cmyk">cmyk</option>
        </select>
      </div>
    </div>
  );
}

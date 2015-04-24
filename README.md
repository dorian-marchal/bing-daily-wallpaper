# bing-wallpaper

A simple node script that sets your wallpaper to the Bing image of the day.

### Installation

```bash
git clone https://github.com/dorian-marchal/bing-wallpaper
cd bing-wallpaper
make install
```

### Usage

```bash
# from bing-wallpaper directory
node bw.js
```

You can run this command at boot time if you want to change your wallpaper everyday : `node /path/to/bing-wallpaper`.

All the downloaded wallpapers are stored in `/path/to/bing-wallpaper/wallpapers/yyyy-mm-dd.jpg`.

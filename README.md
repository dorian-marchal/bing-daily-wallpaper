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

You can run this command at boot time if you want to change your wallpaper everyday : `node /path/to/bing-wallpaper/bw.js`.

All the downloaded wallpapers are stored in `/path/to/bing-wallpaper/wallpapers/yyyy-mm-dd.jpg`.


### Options

- __--notify__

  Use --notify to show a native notification with the wallpaper copyright

  ```bash
  node bw.js --notify
  ```

  ![Notification](https://cloud.githubusercontent.com/assets/6225979/7679455/1a7bd472-fd5d-11e4-937b-10cee4c48239.png)

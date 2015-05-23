# bing-daily-wallpaper

A simple node script that sets your wallpaper to the Bing image of the day.

### Installation

```bash
sudo npm install -g bing-daily-wallpaper
```

### Usage

```bash
bing-daily-wallpaper
```

You can run this command at boot time if you want to change your wallpaper everyday.


### Options

- __--directory `/path/to/dir`__

  Use --directory to choose the directory in which you want your wallpapers to be saved. By default, they will be saved in `$HOME/.bing-wallpapers`.

  ```bash
  bing-daily-wallpaper --directory /tmp
  ```

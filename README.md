# bing-wall

A simple node script that sets your wallpaper to the Bing image of the day.

### Installation

```bash
sudo npm install -g bing-wall
```

### Usage

```bash
bing-wall
```

You can run this command at boot time if you want to change your wallpaper everyday.


### Options

- __--notify__

  Use --notify to show a native notification with the wallpaper copyright

  ```bash
  bing-wall --notify
  ```

  ![Notification](https://cloud.githubusercontent.com/assets/6225979/7679455/1a7bd472-fd5d-11e4-937b-10cee4c48239.png)

- __--directory `/path/to/dir`__

  Use --directory to choose the directory in wich you want your wallpapers to be saved. By default, they will be saved in `$HOME/.bing-wallpapers`.

  ```bash
  bing-wall --directory /tmp
  ```

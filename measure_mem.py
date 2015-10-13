import time, subprocess

first = -1

while 1:
  out = subprocess.check_output(['free', '-m'])
  curr = out.split(' buffers/cache')[1].replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').replace('  ', ' ').split('\n')[0].split(' ')[1]
  if first < 0:
    first = curr
  print int(curr)-int(first)
  time.sleep(0.005)

